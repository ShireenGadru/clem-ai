import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import chatRouter from "./routes/chatRouter.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());
app.use("/", chatRouter);

export { app };
