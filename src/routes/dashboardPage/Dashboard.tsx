import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex-1 flex flex-col items-center justify-center w-1/2 gap-12">
        <div className="flex items-center gap-5 opacity-20">
          <img src="/logo.png" alt="" className="w-16 h-16" />
          <h1 className="text-[64px] font-bold bg-linear-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent ">
            CLEM AI
          </h1>
        </div>
        <div className="w-full flex items-center justify-between gap-12">
          <div className="flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-[20px] flex-1 items-center">
            <img src="/chat.png" alt="" className="w-10 h-10 object-cover" />
            <span>Create a new Chat</span>
          </div>
          <div className="flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-[20px] flex-1 items-center">
            <img src="/image.png" alt="" className="w-10 h-10 object-cover" />
            <span>Analyse Image</span>
          </div>
          <div className="flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-[20px] flex-1 items-center">
            <img src="/code.png" alt="" className="w-10 h-10 object-cover" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="mt-auto w-1/2 bg-[#2c2937] flex rounded-[20px]">
        <form
          action=""
          className="w-full h-full flex items-center justify-between gap-5 mb-2.5"
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 p-5 bg-transparent border-none outline-none text-[#ececec]"
          />
          <button className="bg-[#605e68] mr-5 p-2.5 cursor-pointer border-none rounded-full">
            <img src="/arrow.png" alt="" className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
