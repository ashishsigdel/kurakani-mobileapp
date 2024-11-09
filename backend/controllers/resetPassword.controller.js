import asyncHandler from "../utils/asyncHandler.js";
import db from "../models/index.js";
import ApiError from "../utils/apiError.js";
import {
  comparePassword,
  generateOtp,
  hashPassword,
} from "../services/passwordServices.js";
import ApiResponse from "../utils/apiResponse.js";
import { transport } from "../email.js";
const { User, ResetPassword, RefreshToken } = db;
import { v4 as uuidv4 } from "uuid";

export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });

  if (!user) {
    throw new ApiError({
      status: 404,
      message: "User not found.",
    });
  }

  const passwordReset = await ResetPassword.findOne({
    where: {
      userId: user.id,
    },
    order: [["createdAt", "DESC"]],
  });

  if (
    passwordReset &&
    passwordReset.createdAt > Date.now() - 60 * 1000 // 1 min
  ) {
    throw new ApiError({
      status: 429,
      message: "Please wait 1 min before another request.",
    });
  }

  const otp = generateOtp(6);

  const hashedOtp = await hashPassword(otp);

  // if other request are unused they must be make used
  await ResetPassword.update(
    {
      isUsed: true,
    },
    {
      where: {
        userId: user.id,
      },
    }
  );

  const resetToken = uuidv4();

  const newRequest = await ResetPassword.create({
    userId: user.id,
    expiresAt: Date.now() + 10 * 60000,
    isUsed: false,
    otp: hashedOtp,
    resetToken,
  });

  //send otp goes here
  const htmlTemplate = `
    <h1>Your OTP Code</h1>
    <p>Use the following OTP code to complete your verification:</p>
    <h2>${otp}</h2>
    <p>This code will expire in 10 minutes.</p>
  `;

  const mailOptions = {
    from: "noreply@kurakani.com",
    to: email,
    subject: "Your OTP code",
    html: htmlTemplate,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new ApiError({
      status: 500,
      message: "Failed to send OTP.",
    });
  }

  let responseData = {
    resetToken,
  };
  return new ApiResponse({
    status: 200,
    message: "OTP sent.",
    data: responseData,
  }).send(res);
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { otp, resetToken } = req.body;

  if (!otp || !resetToken) {
    throw new ApiError({
      status: 400,
      message: "Please provide OTP and reset token",
    });
  }
  const passwordReset = await ResetPassword.findOne({
    where: {
      resetToken,
    },
  });

  if (!passwordReset) {
    throw new ApiError({
      status: 400,
      message: "Invalid reset token",
    });
  }

  if (passwordReset.isUsed) {
    throw new ApiError({
      status: 400,
      message: "OTP already used.",
    });
  }

  if (passwordReset.expiresAt < Date.now()) {
    throw new ApiError({
      status: 400,
      message: "OTP expired.",
    });
  }

  const isMatch = await comparePassword(otp, passwordReset.otp);

  if (!isMatch) {
    throw new ApiError({
      status: 400,
      message: "Invalid OTP.",
    });
  }

  passwordReset.isUsed = true;
  passwordReset.save();

  return new ApiResponse({
    status: 200,
    message: "OTP verified.",
  }).send(res);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, otp, password, confirmPassword } = req.body;

  if (!otp || !resetToken) {
    throw new ApiError({
      status: 400,
      message: "Please provide OTP and reset token",
    });
  }
  const passwordReset = await ResetPassword.findOne({
    where: {
      resetToken,
    },
  });

  if (!passwordReset) {
    throw new ApiError({
      status: 400,
      message: "Invalid reset token",
    });
  }
  const isMatch = await comparePassword(otp, passwordReset.otp);

  if (!isMatch) {
    throw new ApiError({
      status: 400,
      message: "Invalid OTP.",
    });
  }

  const user = await User.findOne({
    where: {
      id: passwordReset.userId,
    },
  });

  if (!user) {
    throw new ApiError({
      status: 404,
      message: "User not found",
    });
  }

  if (!password) {
    throw new ApiError({
      status: 400,
      message: "Password is required",
    });
  }
  if (!confirmPassword) {
    throw new ApiError({
      status: 400,
      message: "ConfirmPassword is required",
    });
  }

  if (password !== confirmPassword) {
    throw new ApiError({
      status: 400,
      message: "ConfirmPassword is not matched!",
    });
  }

  const hashedPassword = await hashPassword(password);

  user.password = hashedPassword;
  await user.save();

  await RefreshToken.destroy({
    where: {
      userId: user.id,
    },
    force: true,
  });

  await ResetPassword.destroy({
    where: {
      userId: user.id,
    },
    force: true,
  });

  return new ApiResponse({
    status: 200,
    message: "Password updated successfully",
  }).send(res);
});
