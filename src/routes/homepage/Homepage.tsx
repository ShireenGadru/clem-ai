import React from "react";
import { Link } from "react-router-dom";

const Homepage: React.FC = () => {
  return (
    <div className="flex items-center gap-25 h-full">
      {/* left  */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <h1>LAMA AI</h1>
        <h2>Some description Some description</h2>
        <h3>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est expedita
          nihil sequi cumque sed, illo esse magni nemo id provident molestias
          tempora facilis architecto, nobis molestiae assumenda, praesentium
          doloribus corporis.
        </h3>
        <Link to="/dashboard" className="bg-amber-500 p-2 text-black">Get Started</Link>
      </div>
      {/* right  */}
      <div className="flex-1"></div>
    </div>
  );
};

export default Homepage;
