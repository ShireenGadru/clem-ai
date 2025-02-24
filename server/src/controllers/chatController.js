import ImageKit from "imagekit";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";
import { UserChats } from "../models/userChat.model.js";
import { clerkClient, getAuth } from "@clerk/express";

var imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
});

const imageUpload = asyncHandler(async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  if (result) {
    res
      .status(200)
      .json(new ApiResponse(200, result, "Image uploaded successfully"));
  } else {
    throw new ApiError(401, "Unable to upload image");
  }
});

const storeNewChat = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { userId } = getAuth(req);
  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId);

  try {
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS

    const userChats = await UserChats.find({ userId });

    //IF USER CHATS DOESNT EXIST , CREATE A NEW ONE AND ADD THE CHAT IN CHATS ARRAY

    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChats.save();
    } else {
      // IF USER CHAT ALREADY EXISTS, THEN ADD THE CHAT TO THIS EXISTING USER CHAT
      await UserChats.updateOne(
        { userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }

    res.status(200).json(
      new ApiResponse(
        200,
        {
          chatId: newChat._id,
          user,
        },
        "New Chat saved in DB"
      )
    );
  } catch (error) {
    throw new ApiError(400, "Error while storing new chat");
  }
});

const getChat = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).json(new ApiResponse(200, chat, "Chat fetched"));
  } catch (error) {
    throw new ApiError(401, "Error fetching chat");
  }
});

const getChatList = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const userChats = await UserChats.find({ userId });
    if (userChats) {
      res
        .status(200)
        .json(
          new ApiResponse(200, userChats[0]?.chats, "Chat fetched successfully")
        );
    } else {
      throw new Error("Error while fetching chat");
    }
  } catch (error) {
    throw new ApiError(401, "Error fetching chat list");
  }
});

const updateChatHistory = asyncHandler(async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { question, answer, img, category } = req.body;

    const userItem = {
      role: "user",
      parts: [
        {
          text: question,
        },
      ],
      ...(img && { img }),
      category,
    };
    const botItem = {
      role: "model",
      parts: [
        {
          text: answer,
        },
      ],
      category,
    };

    const newItems = [...(question ? [userItem] : []), botItem];

    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, updatedChat, "Updated Chat history successfully")
      );
  } catch (error) {
    throw new ApiError(401, "Error while updating chat history");
  }
});

export { imageUpload, storeNewChat, getChat, getChatList, updateChatHistory };
