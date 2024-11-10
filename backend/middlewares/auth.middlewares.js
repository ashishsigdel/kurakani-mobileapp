import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwtUtils.js";
import db from "../models/index.js";

const { User, RefreshToken } = db;

export const authMiddleware = asyncHandler(async (req, res, next) => {
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

  let decodedToken;
  try {
    decodedToken = verifyToken({ token: accessToken });
  } catch (error) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized",
    });
  }

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

  if (refreshToken.expiresAt < Date.now()) {
    throw new ApiError({
      status: 401,
      message: "Refresh token expired!",
    });
  }

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

  req.user = user;
  next();
});
