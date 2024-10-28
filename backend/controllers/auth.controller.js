import { comparePassword, hashPassword } from "../services/passwordServices.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";

const { User, RefreshToken } = db;

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName) {
    throw new ApiError({
      status: 400,
      message: "Name is required",
    });
  }
  if (!email) {
    throw new ApiError({
      status: 400,
      message: "Email is required",
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

  const userAlreadyExists = await User.findOne({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    throw new ApiError({
      status: 400,
      message: "User already exists with that email.",
    });
  }

  let username = email.split("@")[0];

  const usernameExists = await User.findOne({
    where: {
      username,
    },
  });

  if (usernameExists) {
    const lastUser = await User.findOne({
      order: [["id", "DESC"]],
    });

    const lastUserId = lastUser.id;

    const newUsername = `${username}${lastUserId + 1}`;

    username = newUsername;
  }

  const user = await User.create({
    email,
    fullName,
    username,
    password: hashedPassword,
  });

  return new ApiResponse({
    status: 200,
    message: "User Registered!",
  }).send(res);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError({
      status: 400,
      message: "Email is required",
    });
  }
  if (!password) {
    throw new ApiError({
      status: 400,
      message: "Password is required",
    });
  }

  // check user
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError({
      status: 401,
      message: "Invalid Credientials",
    });
  }

  // check password
  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError({
      status: 401,
      message: "Invalid Credientials",
    });
  }

  //generate refresh token
  const refreshToken = generateRefreshToken({ userId: user.id });

  //save refresh token
  const savedRefreshToken = await RefreshToken.create({
    token: refreshToken,
    userId: user.id,
    expiresAt: Date.now() + 30 * 60000, // milisecond
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    refreshToken: refreshToken,
  });

  let responseData = {
    accessToken,
    user: await User.findOne({
      where: {
        id: user.id,
      },
      attributes: ["id", "fullName", "username", "email", "profilePic"],
    }),
  };

  res.cookie("accessToken", accessToken, {
    httpOnlu: true,
  });

  return new ApiResponse({
    status: 200,
    message: "user login succcessfully!",
    data: responseData,
  });
});
