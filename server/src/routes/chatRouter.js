import { Router } from "express";
import { requireAuth } from "@clerk/express";
import {
  imageUpload,
  storeNewChat,
  getChat,
  getChatList,
  updateChatHistory,
} from "../controllers/chatController.js";

const router = Router();

router.get("/api/upload", imageUpload);

router.post("/api/chats", requireAuth(), storeNewChat);

router.get("/api/chats/:id", requireAuth(), getChat);

router.get("/api/userchats", requireAuth(), getChatList);

router.put("/api/chats/:id", requireAuth(), updateChatHistory);

export default router;
