import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useWindowWidth from "../hooks/useWindowWidth";

const APIendpoint = import.meta.env.VITE_API_URL;

const ChatList: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const isLargeScreen = useWindowWidth(1000);
  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${APIendpoint}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const toggleSidebar = () => {
    setShowSidebar((prev) => {
      return !prev;
    });
  };
  return (
    <div
      className={`flex flex-col h-full ${
        showSidebar ? "w-60" : "w-16"
      } bg-[#0D0F10] p-5 rounded-2xl transition-all duration-200`}
    >
      <div
        className="flex items-end w-full justify-end cursor-pointer hover:invert-25"
        onClick={toggleSidebar}
      >
        <img src="./menu.png" alt="" className="w-7 h-7" />
      </div>
      {showSidebar && (
        <>
          <Link to="/dashboard">
            <button className="border w-full border-green-700/70 py-3 px-2 my-8 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-300 hover:text-black hover:font-semibold ">
              Create a new Chat
            </button>
          </Link>{" "}
          <span className="font-semibold text-[10px] my-2.5 ">
            RECENT CHATS
          </span>
          <div
            className={`flex flex-col overflow-auto ${
              !isLargeScreen && "max-h-[300px]"
            }`}
          >
            {isLoading && <div>Loading....</div>}
            {error && <div>Somethign went wrong</div>}

            {response &&
              response?.data?.map((chat: any) => (
                <Link
                  to={`/dashboard/chats/${chat._id}`}
                  className="p-2.5 rounded-[10px] hover:bg-[#2c2937]"
                  key={chat?._id}
                >
                  {chat?.title}
                </Link>
              ))}
          </div>
          <div className="mt-auto pt-4 flex items-center gap-2.5 text-xs">
            <img src="/logo.png" alt="" className="w-6 h-6" />
            <div className="flex flex-col">
              <span className="font-semibold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                CLEM AI
              </span>
              <span className="text-[#888]">Powered by gemini-1.5-flash</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatList;
