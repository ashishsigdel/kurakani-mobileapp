import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getImageUrl } from "../utils/fileUpload.js";

import db from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";

const { User, Op, Connection, Sequelize, ConnectionRequest } = db;

export const update = asyncHandler(async (req, res) => {
  const { fullName, email, username } = req.body;

  const profilePic = req.file;

  const user = req.user;

  if (fullName && user.fullName !== fullName) {
    await user.update({
      fullName,
    });
  }
  if (email && user.email !== email) {
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      throw new ApiError({
        status: 400,
        message: "Email already exists",
      });
    }
    await user.update({
      email,
    });
  }
  if (username && user.username !== username) {
    const checkUsername = await User.findOne({
      where: {
        username,
      },
    });
    if (checkUsername) {
      throw new ApiError({
        status: 400,
        message: "Username already exists",
      });
    }
    await user.update({
      username,
    });
  }

  if (profilePic) {
    let publicUrl;
    try {
      //upload image to firebase
      publicUrl = await getImageUrl({
        buffer: profilePic.buffer,
        originalname: profilePic.originalname,
        mimetype: profilePic.mimetype,
      });
    } catch (error) {
      throw new ApiError({
        status: 500,
        message: "Failed to upload profile picture",
      });
    }
    await user.update({
      profilePic: publicUrl,
    });
  }
  let responseData = await User.findOne({
    where: {
      id: user.id,
    },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });
  return new ApiResponse({
    status: 200,
    message: "User updated successfully",
    data: responseData,
  }).send(res);
});

export const getRandomUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const userId = req.user.id;

  if (search) {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                username: {
                  [Op.like]: `%${search}%`, // Search by username
                },
              },
              {
                fullName: {
                  [Op.like]: `%${search}%`, // Search by full name
                },
              },
            ],
          },
          {
            id: {
              [Op.not]: userId, // Exclude the current user
            },
          },
        ],
      },
      attributes: ["id", "fullName", "username", "email", "profilePic"],
    });

    // Get connection status for each searched user
    const usersWithStatus = await Promise.all(
      users.map(async (user) => {
        let connectionStatus = null;

        // Check if request sent
        const isRequestSent = await ConnectionRequest.findOne({
          where: {
            senderId: userId,
            receiverId: user.id,
          },
        });
        if (isRequestSent) {
          connectionStatus = "sent";
        }

        // Check if request received
        const isRequestReceived = await ConnectionRequest.findOne({
          where: {
            senderId: user.id,
            receiverId: userId,
          },
        });
        if (isRequestReceived) {
          connectionStatus = "received";
        }

        // Check if already connected
        const isConnected = await Connection.findOne({
          where: {
            [Op.or]: [
              { userId: userId, friendId: user.id },
              { userId: user.id, friendId: userId },
            ],
          },
        });
        if (isConnected) {
          connectionStatus = "connected";
        }

        return {
          ...user.toJSON(),
          connectionStatus,
        };
      })
    );

    return new ApiResponse({
      status: 200,
      message: "Users fetched successfully",
      data: usersWithStatus,
    }).send(res);
  } else {
    // If no search query, fetch random users
    const friends = await Connection.findAll({
      where: {
        userId: userId,
      },
      attributes: ["friendId"],
    });

    const friendIds = friends.map((friend) => friend.friendId);

    const randomUsers = await User.findAll({
      where: {
        id: {
          [Op.notIn]: [...friendIds, userId],
        },
      },
      attributes: ["id", "fullName", "username", "email", "profilePic"],
      order: Sequelize.literal("RAND()"), // Randomize selection
      limit: 10, // Limit to 10 users
    });

    // Get connection status for each searched user
    const randomUsersWithStatus = await Promise.all(
      randomUsers.map(async (user) => {
        let connectionStatus = null;

        // Check if request sent
        const isRequestSent = await ConnectionRequest.findOne({
          where: {
            senderId: userId,
            receiverId: user.id,
          },
        });
        if (isRequestSent) {
          connectionStatus = "sent";
        }

        // Check if request received
        const isRequestReceived = await ConnectionRequest.findOne({
          where: {
            senderId: user.id,
            receiverId: userId,
          },
        });
        if (isRequestReceived) {
          connectionStatus = "received";
        }

        // Check if already connected
        const isConnected = await Connection.findOne({
          where: {
            [Op.or]: [
              { userId: userId, friendId: user.id },
              { userId: user.id, friendId: userId },
            ],
          },
        });
        if (isConnected) {
          connectionStatus = "connected";
        }

        return {
          ...user.toJSON(),
          connectionStatus,
        };
      })
    );

    return new ApiResponse({
      status: 200,
      message: "Random users fetched successfully",
      data: randomUsersWithStatus,
    }).send(res);
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: ["id", "fullName", "username", "email", "profilePic"],
  });

  let connectionStatus;
  const isRequestSent = await ConnectionRequest.findOne({
    where: {
      senderId: req.user.id,
      receiverId: userId,
    },
  });
  if (isRequestSent) {
    connectionStatus = "sent";
  }

  const isRequestReceived = await ConnectionRequest.findOne({
    where: {
      senderId: userId,
      receiverId: req.user.id,
    },
  });
  if (isRequestReceived) {
    connectionStatus = "received";
  }

  const isConnected = await Connection.findOne({
    where: {
      [Op.or]: [
        { userId: userId, friendId: req.user.id },
        { userId: req.user.id, friendId: userId },
      ],
    },
  });

  if (isConnected) {
    connectionStatus = "connected";
  }

  let responseData = {
    user,
    connectionStatus,
    chatId: isConnected ? isConnected.conversationId : null,
  };

  return new ApiResponse({
    status: 200,
    message: "User profile fetched successfully",
    data: responseData,
  }).send(res);
});
