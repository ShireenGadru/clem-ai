import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../hooks/useWindowWidth";

const APIendpoint = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (text) => {
      const response = await fetch(`${APIendpoint}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${data?.data?.chatId}`);
    },
  });

  const isLargeScreen = useWindowWidth(1000);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const text = formElement?.text?.value;
    if (!text) return;
    mutate(text);
  };

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex-1 flex flex-col items-center justify-center w-full md:w-5/6 gap-10 md:p-10">
        <div className="flex items-center gap-5 opacity-50">
          <img src="/logo.png" alt="" className="w-8 h-8  md:w-16 md:h-16" />
          <h1 className="text-3xl md:text-6xl lg:text-[72px] font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent ">
            CLEM AI
          </h1>
        </div>
        {isLargeScreen && (
          <div className="w-full flex items-stretch justify-between gap-5 max-w-[600px]">
            <div className="flex flex-col gap-2.5 font-light text-sm p-4 border border-white/10 rounded-[20px] flex-1 h-full items-center justify-center">
              <img src="/chat.png" alt="" className="w-10 h-10 object-cover" />
              <span>Create a new Chat</span>
            </div>
            <div className="flex flex-col gap-2.5 font-light text-sm p-4 border border-white/10 rounded-[20px] flex-1 h-full items-center justify-center">
              <img src="/image.png" alt="" className="w-10 h-10 object-cover" />
              <span>Analyse Image</span>
            </div>
            <div className="flex flex-col gap-2.5 font-light text-sm p-4 border border-white/10 rounded-[20px] flex-1 h-full items-center justify-center">
              <img src="/code.png" alt="" className="w-10 h-10 object-cover" />
              <span>Help me with my code</span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto  px-5 w-11/12 md:w-5/6 bg-[#131619] flex rounded-[20px] mb-4 md:mb-20 border border-white/40 max-w-[900px]">
        <form
          action=""
          className="w-full h-full flex items-center justify-between gap-5 mb-2.5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            className="flex-1 text-sm sm:text-base p-2 md:p-5 bg-transparent border-none outline-none text-[#ececec]"
          />
          <button className="bg-[#605e68] md:mr-5 p-2.5 cursor-pointer border-none rounded-full">
            <img src="/arrow.png" alt="" className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
