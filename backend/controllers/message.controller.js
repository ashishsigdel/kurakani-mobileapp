import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getImageUrl } from "../utils/fileUpload.js";

import db from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";
const { Message, Conversation, User, Connection } = db;

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const media = req.file;

  if (!media && !message) {
    throw new ApiError({
      status: 400,
      message: "Nothing to send.",
    });
  }

  let publicUrl;
  if (media) {
    try {
      //upload image to firebase
      publicUrl = await getImageUrl({
        buffer: media.buffer,
        originalname: media.originalname,
        mimetype: media.mimetype,
      });
    } catch (error) {
      throw new ApiError({
        status: 500,
        message: "Failed to upload profile picture",
      });
    }
  }

  const { conversationId, receiverId } = req.params;

  if (!conversationId || !receiverId) {
    throw new ApiError({
      status: 400,
      message: "Unable to send.",
    });
  }

  const receiver = await User.findByPk(receiverId);

  if (!receiver) {
    throw new ApiError({
      status: 400,
      message: "Unable to send.",
    });
  }

  const conversation = await Conversation.findByPk(conversationId);

  if (!conversation) {
    throw new ApiError({
      status: 400,
      message: "Unable to send.",
    });
  }

  const checkConnection = await Connection.findOne({
    where: {
      userId: req.user.id,
      friendId: receiver.id,
      conversationId: conversation.id,
    },
  });

  if (!checkConnection) {
    throw new ApiError({
      status: 400,
      message: "Please connect first to chat.",
    });
  }

  const newMessage = await Message.create({
    senderId: req.user.id,
    receiverId,
    conversationId,
    message,
    mediaURL: publicUrl,
  });

  const updateConnection = await checkConnection.update({
    lastMessageAt: Date.now(),
    lastMessage: message,
    isSendByme: true,
  });

  const checkConnectionOther = await Connection.findOne({
    where: {
      userId: receiver.id,
      friendId: req.user.id,
      conversationId: conversation.id,
    },
  });

  const updateConnectionOther = await checkConnectionOther.update({
    lastMessageAt: Date.now(),
    lastMessage: message,
    isSendByme: false,
  });

  return new ApiResponse({
    status: 200,
    message: "Message sent successfully.",
    data: newMessage,
  }).send(res);
});

export const fetchAllMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const user = req.user;

  if (!conversationId) {
    throw new ApiError({
      status: 400,
      message: "Unable to fetch.",
    });
  }

  const conversation = await Conversation.findByPk(conversationId);

  if (!conversation) {
    throw new ApiError({
      status: 400,
      message: "Unable to fetch.",
    });
  }

  const checkConnection = await Connection.findOne({
    where: {
      userId: user.id,
      conversationId: conversation.id,
    },
  });

  if (!checkConnection) {
    throw new ApiError({
      status: 400,
      message: "You can't view messages.",
    });
  }

  const allMessages = await Message.findAll({
    where: {
      conversationId,
    },
  });

  const messageWithStatus = allMessages.map((message) => ({
    ...message.toJSON(),
    isSendByme: message.senderId === user.id,
  }));

  return new ApiResponse({
    status: 200,
    message: "Messages fetched",
    data: messageWithStatus,
  }).send(res);
});

export const getUserByConversationId = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const user = req.user;

  if (!conversationId) {
    throw new ApiError({
      status: 400,
      message: "Unable to fetch.",
    });
  }

  const conversation = await Conversation.findByPk(conversationId);

  if (!conversation) {
    throw new ApiError({
      status: 400,
      message: "Unable to fetch.",
    });
  }

  const checkConnection = await Connection.findOne({
    where: {
      userId: user.id,
      conversationId: conversation.id,
    },
  });

  if (!checkConnection) {
    throw new ApiError({
      status: 400,
      message: "You can't view messages.",
    });
  }

  const friendDetails = await User.findOne({
    where: {
      id: checkConnection.friendId,
    },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  if (!friendDetails) {
    throw new ApiError({
      status: 400,
      message: "unable to fetch",
    });
  }
  return new ApiResponse({
    status: 200,
    message: "success",
    data: friendDetails,
  }).send(res);
});
