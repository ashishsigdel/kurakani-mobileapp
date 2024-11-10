import { comparePassword, hashPassword } from "../services/passwordServices.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
  getAuthToken,
  getCookieToken,
} from "../utils/jwtUtils.js";
import { verifyToken } from "../utils/jwtUtils.js";

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
    expiresAt: Date.now() + 30 * 60000 * 48 * 30, // milisecond
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    refreshTokenId: savedRefreshToken.id,
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

  res.cookie("accessToken", `Bearer ${accessToken}`, {
    httpOnly: true,
  });

  return new ApiResponse({
    status: 200,
    message: "user login succcessfully!",
    data: responseData,
  }).send(res);
});

export const refreshTokenAccess = asyncHandler(async (req, res) => {
  const token = getCookieToken(req) || getAuthToken(req);

  if (!token) {
    throw new ApiError({
      message: "Unauthorized",
      status: 401,
    });
  }

  if (!token) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized",
    });
  }
  const decodedToken = verifyToken({
    token: token,
    ignoreExpiration: true,
  });

  if (!decodedToken) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const refreshToken = await RefreshToken.findOne({
    where: {
      id: decodedToken.rfId,
      userId: decodedToken.id,
    },
  });

  if (!refreshToken) {
    throw new ApiError({
      status: 401,
      message: "Refresh token not found!",
    });
  }

  verifyToken({ token: refreshToken.token });

  const user = await User.findOne({
    where: {
      id: decodedToken.id,
    },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  if (!user) {
    throw new ApiError({
      status: 401,
      message: "User not found with provided token!",
    });
  }

  const newAccessToken = generateAccessToken({
    userId: user.id,
    refreshTokenId: refreshToken.id,
  });

  let responseData = {
    accessToken: newAccessToken,
    user: await User.findOne({
      where: {
        id: user.id,
      },
      attributes: ["id", "fullName", "username", "email", "profilePic"],
    }),
  };

  res.cookie("accessToken", `Bearer ${newAccessToken}`, {
    httpOnly: true,
  });

  return new ApiResponse({
    status: 200,
    message: "Refresh token refreshed.",
    data: responseData,
  }).send(res);
});

export const logout = asyncHandler(async (req, res) => {
  let accessToken;
  if (req && req.cookies && req.cookies.accessToken) {
    accessToken = req.cookies.accessToken;
  }
  if (!accessToken) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const decodedToken = verifyToken({
    token: accessToken,
    ignoreExpiration: true,
  });

  if (!decodedToken) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const refreshToken = await RefreshToken.findOne({
    where: {
      id: decodedToken.rfId,
      userId: decodedToken.id,
    },
  });

  if (!refreshToken) {
    throw new ApiError({
      status: 401,
      message: "Refresh token not found!",
    });
  }

  verifyToken({ token: refreshToken.token });

  await RefreshToken.destroy({
    where: {
      id: refreshToken.id,
    },
    force: true,
  });

  res.clearCookie("accessToken");

  return new ApiResponse({
    status: 200,
    message: "Logged out successfully",
  }).send(res);
});
