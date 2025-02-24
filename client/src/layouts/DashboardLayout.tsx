import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";

const DashboardLayout: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="flex  gap-6 pt-5 h-full">
      <div>
        <ChatList />
      </div>
      <div className="flex-1 bg-[#0D0F10] rounded-2xl">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
