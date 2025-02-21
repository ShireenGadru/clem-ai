import React, { useEffect, useRef } from "react";

const NewPrompt: React.FC = () => {
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endRef?.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* add new chat  */}
      <div className="pb-27" ref={endRef}></div>
      <form
        action=""
        className="w-1/2 absolute bottom-0 bg-[#2c2937] rounded-[20px] flex  items-center gap-5 px-5"
      >
        <label
          htmlFor="file"
          className="rounded-full border-none bg-[#605e68] p-2.5 flex items-center justify-center cursor-pointer"
        >
          <img src="/attachment.png" alt="" className="w-4 h-4 " />
        </label>
        <input type="file" multiple={false} id="file" hidden />
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 p-5 bg-transparent border-none outline-none text-[#ececec]"
        />
        <button className="mr-5 cursor-pointer rounded-full border-none bg-[#605e68] p-2.5 flex items-center justify-center">
          <img src="/arrow.png" alt="" className="w-4 h-4 " />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
