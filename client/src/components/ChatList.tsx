import React from "react";
import { Link } from "react-router-dom";

const ChatList: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <span className="font-semibold text-[10px] mb-2.5 ">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Clem AI</Link>
      <Link to="/">Contact</Link>

      <hr className="border-none h-0.5 bg-[#ddd] opacity-[0.1] rounded-sm my-5" />
      <span className="font-semibold text-[10px] mb-2.5 ">RECENT CHATS</span>
      <div className="flex flex-col overflow-auto ">
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        <Link to="/" className="p-2.5 rounded-[10px] hover:bg-[#2c2937]">
          My Chat title
        </Link>
        
      </div>
      <hr className="border-none h-0.5 bg-[#ddd] opacity-[0.1] rounded-sm my-5" />

      <div className="mt-auto flex items-center gap-2.5 text-xs">
        <img src="/logo.png" alt="" className="w-6 h-6"/>
        <div className="flex flex-col">
          <span className="font-semibold">Upgrade to CLEM AI Pro</span>
          <span className="text-[#888]">Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
