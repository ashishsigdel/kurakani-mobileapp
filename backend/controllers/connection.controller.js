import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";

const { User, ConnectionRequest, Conversation, Connection, Op } = db;

export const sendRequest = asyncHandler(async (req, res) => {
  const receiverId = parseInt(req.query.receiverId, 10);

  if (!receiverId) {
    throw new ApiError({
      status: 400,
      message: "Cannot send request.",
    });
  }

  const user = req.user;

  if (user.id == receiverId) {
    throw new ApiError({
      status: 400,
      message: "Cannot send request to yourself.",
    });
  }

  const receiver = await User.findByPk(receiverId);

  if (!receiver) {
    throw new ApiError({
      status: 400,
      message: "Cannot send request.",
    });
  }

  const alreadyRequest = await ConnectionRequest.findOne({
    where: {
      senderId: user.id,
      receiverId: receiverId,
    },
  });

  if (alreadyRequest) {
    await ConnectionRequest.destroy({
      where: {
        senderId: user.id,
        receiverId: receiverId,
      },
    });

    return new ApiResponse({
      status: 200,
      message: "Request unsent successfully.",
    }).send(res);
  }
  const createRequest = await ConnectionRequest.create({
    senderId: user.id,
    receiverId: receiverId,
  });

  return new ApiResponse({
    status: 200,
    message: "Request sent successfully.",
    data: createRequest,
  }).send(res);
});

export const acceptRequest = asyncHandler(async (req, res) => {
  const { connectionRequestId } = req.query;

  const connection = await ConnectionRequest.findByPk(connectionRequestId);

  if (!connection) {
    throw new ApiError({
      status: 404,
      message: "Request not found!",
    });
  }

  const receiverId = connection.receiverId;

  const user = req.user;

  if (receiverId !== user.id) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized!",
    });
  }

  const conversation = await Conversation.create();

  const newConnection = await Connection.create({
    userId: user.id,
    friendId: connection.senderId,
    conversationId: connection.id,
    lastMessageAt: Date.now(),
  });

  await Connection.create({
    userId: connection.senderId,
    friendId: user.id,
    conversationId: connection.id,
    lastMessageAt: Date.now(),
  });

  await connection.destroy();

  return new ApiResponse({
    status: 200,
    message: "Connection Established",
    data: newConnection,
  }).send(res);
});

export const rejectRequest = asyncHandler(async (req, res) => {
  const { connectionRequestId } = req.query;

  const connection = await ConnectionRequest.findByPk(connectionRequestId);

  if (!connection) {
    throw new ApiError({
      status: 404,
      message: "Request not found!",
    });
  }

  const receiverId = connection.receiverId;

  const user = req.user;

  if (receiverId !== user.id) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized!",
    });
  }

  await connection.destroy();

  return new ApiResponse({
    status: 200,
    message: "Request rejected!",
  }).send(res);
});

export const fetchConnections = asyncHandler(async (req, res) => {
  const user = req.user;

  const { search } = req.query;

  const whereCondition = {
    userId: user.id,
  };

  const includeConditions = {
    model: User,
    as: "user",
    attributes: ["id", "fullName", "username", "email", "profilePic"],
  };

  if (search) {
    includeConditions.where = {
      [Op.or]: [
        {
          fullName: {
            [Op.like]: `%${search}`,
          },
        },
        {
          username: {
            [Op.like]: `%${search}`,
          },
        },
      ],
    };
  }
  const allConnections = await Connection.findAll({
    where: whereCondition,
    attributes: [
      "id",
      "conversationId",
      "lastMessageAt",
      "lastMessage",
      "isSendByme",
    ],
    include: [includeConditions],
    order: [["lastMessageAt", "DESC"]],
  });

  return new ApiResponse({
    status: 200,
    message: "All connection fetched successfully.",
    data: allConnections,
  }).send(res);
});

export const fetchConnectionsRequest = asyncHandler(async (req, res) => {
  const user = req.user;

  const allRequest = await ConnectionRequest.findAll({
    where: {
      receiverId: user.id,
    },
    attributes: ["id", "createdAt"],
    include: [
      {
        model: User,
        as: "sender",
        attributes: ["id", "fullName", "username", "email", "profilePic"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return new ApiResponse({
    status: 200,
    message: "All request fetched successfully.",
    data: allRequest,
  }).send(res);
});
