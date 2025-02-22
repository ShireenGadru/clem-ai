import dotenv from "dotenv";
import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import { Chat } from "./models/chat.model.js";
import { UserChats } from "./models/userChat.model.js";
import {
  clerkMiddleware,
  clerkClient,
  requireAuth,
  getAuth,
} from "@clerk/express";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected!");
  } catch (error) {
    console.error("Error while connecting to DB", error);
  }
};

var imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  console.log(result);

  res.send(result);
});

app.post("/api/chats", requireAuth(), async (req, res) => {
  const { text } = req.body;
  const { userId } = getAuth(req);
  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId);
  // console.log(userId, user);

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

    res.status(201).json({
      success: true,
      data: {
        chatId: newChat._id,
        user,
      },
      message: "Chat saved in DB",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Chat");
  }
});

app.get("/api/chats/:id", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).json({
      success: true,
      message: "Chat fetched",
      chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Chat");
  }
});

app.get("/api/userchats", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const userChats = await UserChats.find({ userId });
    if (userChats) {
      res.status(200).json({
        success: true,
        chats: userChats[0].chats,
        message: "Chat fetched successfully",
      });
    } else {
      throw new Error("Error while fetching chat");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Chat");
  }
});

app.put("/api/chats/:id", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { question, answer, img } = req.body;
    console.log({ question, answer, img });

    const userItem = {
      role: "user",
      parts: [
        {
          text: question,
        },
      ],
      ...(img && { img }),
    };
    const botItem = {
      role: "model",
      parts: [
        {
          text: answer,
        },
      ],
    };

    const newItems = [...(question ? [userItem] : []), botItem];
    console.log(newItems);
    
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
    res.status(200).json({
      success: true,
      message: "Stored Chat successfully",
      updatedChat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Storing Chat");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated");
});

app.listen(port, () => {
  connect();
  console.log("Server is running!");
});
