import { Dispatch, SetStateAction } from "react";
import { Part } from "@google/generative-ai";

export interface Response {
  chat: IChat;
  message: string;
  success: boolean;
}

export interface IChat {
  createdAt: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;

  history: IHistory[];
}

export interface IHistory {
  img?: string;
  parts: {
    text: string;
    _id: string;
  }[];
  role: string;
  _id: string;
}

export interface IUploadProps {
  setImg: Dispatch<SetStateAction<ImgData>>;
}

export interface ImgData {
  isLoading: boolean;
  error: string;
  dbData: {
    filePath?: string;
  };
  aiData: string | Part;
}

export interface INewPromptProps {
  data: any;
}