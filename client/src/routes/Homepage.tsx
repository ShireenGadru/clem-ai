import React from "react";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "../components/AnimatedBg";
import useWindowWidth from "../hooks/useWindowWidth";

const Homepage: React.FC = () => {
  const showBackground = useWindowWidth(600);

  return (
    <div className="flex items-center justify-center h-screen  px-6">
      {showBackground && <AnimatedBackground />}
      <div className="flex flex-col items-center text-center gap-6">
        {/* Logo & Title */}
        <div className="flex flex-col items-center gap-3 opacity-75 mb-5 md:mb-16">
          <img
            src="/logo.png"
            alt="CLEM AI Logo"
            className="md:w-20 md:h-20 h-10 w-10"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-t from-green-300 to-green-500 bg-clip-text text-transparent">
            CLEM AI
          </h1>
          <span className="text-[#c8c8c8] text-xs">
            Powered by gemini-1.5-flash
          </span>
        </div>

        {/* Description */}
        <h2 className="text-sm md:text-2xl font-semibold text-gray-100">
          Your AI-Powered Companion for Smart Conversations
        </h2>
        {showBackground && (
          <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
            CLEM AI is your intelligent chatbot for instant answers, creative
            ideas, and insightful conversations. Powered by advanced AI, it
            delivers a seamless and engaging experience whenever you need it.
          </p>
        )}

        {/* Get Started Button */}
        <Link
          to="/dashboard"
          className="mt-5 border-3 mb-5 md:mb-20 border-green-700 text-white px-8 py-3 rounded-lg font-medium text-sm md:text-lg shadow-md transition hover:bg-green-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
