import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatList from "../../components/ChatList";

const DashboardLayout: React.FC = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  console.log({ userId, isLoaded });
  

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="flex  gap-12 pt-5 h-full">
      <div className="flex-1"><ChatList /></div>
      <div className="flex-4 bg-[#12101b]" >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
