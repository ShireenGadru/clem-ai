import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserChats =  mongoose.models.userchats ||
  mongoose.model("userchats", userChatsSchema);
