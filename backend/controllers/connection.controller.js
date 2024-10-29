import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";

const { User, ConnectionRequest } = db;

export const sendRequest = asyncHandler(async (req, res) => {
  const { receiverId } = req.query;

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
