import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import useWindowWidth from "../hooks/useWindowWidth";

const DashboardLayout: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const showSidebar = useWindowWidth(1000);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="flex  gap-6 pt-5 h-full relative">
      {showSidebar ? (
        <div>
          <ChatList />
        </div>
      ) : (
        <div className="absolute top-6 left-0 z-10 border border-white/20 rounded-xl ml-1 max-h-[600px]">
          <ChatList />
        </div>
      )}

      <div className="flex-1 sm:bg-[#0D0F10] sm:rounded-2xl">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
