import React from "react";
import NewPrompt from "../components/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import { IHistory } from "../types/data.types";
import "./ChatPage.css";

const APIendpoint = import.meta.env.VITE_API_URL;
const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;

const ChatPage: React.FC = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${APIendpoint}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const userCN = "p-5 bg-[#2c2937] rounded-[20px] max-w-[80%] self-end";
  const chatHistory = response?.data?.history;

  return (
    <div className="h-full flex flex-col items-center relative pb-5">
      <div className="flex-1 overflow-auto w-full flex justify-center [&::-webkit-scrollbar]:hidden">
        <div className="w-1/2 flex flex-col">
          {isLoading && <div>Loading....</div>}
          {error && <div>Somethign went wrong</div>}
          {response &&
            chatHistory?.map((chat: IHistory, index: number) => (
              <div key={index} className="w-full flex flex-col mt-4">
                {chat?.img && (
                  <IKImage
                    urlEndpoint={urlEndpoint}
                    path={chat?.img}
                    width="300"
                    transformation={[{ width: "300" }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <div
                  className={`${chat?.role === "user" ? userCN : "p-5 format"}`}
                  key={index}
                >
                  <Markdown>{chat?.parts?.[0]?.text}</Markdown>
                </div>
              </div>
            ))}

          {response && <NewPrompt data={response?.data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
