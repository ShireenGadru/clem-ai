import React, { FormEvent, useEffect, useRef, useState } from "react";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import Markdown from "react-markdown";
import { Part } from "@google/generative-ai";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const APIendpoint = import.meta.env.VITE_API_URL;

export interface ImgData {
  isLoading: boolean;
  error: string;
  dbData: {
    filePath?: string;
  };
  aiData: string | Part;
}

interface INewPromptProps {
  data: any;
}

const NewPrompt: React.FC<INewPromptProps> = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState<ImgData>({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: "",
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const endRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (endRef?.current) endRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(endRef.current);
    
  }, [data, question, answer, img]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await fetch(`${APIendpoint}/api/chats/${data?.data?._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question || undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      });
    },
    onSuccess: () => {
      console.log(data?.data?._id);
      queryClient
        .invalidateQueries({ queryKey: ["chat", data?.data?._id] })
        .then(() => {
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: "",
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (prompt: string, isInitial = false) => {
    if (!isInitial) {
      setQuestion(prompt);
    }

    if (formRef.current) {
      formRef.current.reset();
    }

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, prompt] : prompt
      );
      let compelteResponse = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        compelteResponse += chunkText;
        setAnswer(compelteResponse);
      }
      mutation.mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const text = formElement?.text?.value;
    if (!text) return;
    add(text);
  };

  useEffect(() => {
    if (data?.data?.history?.length === 1) {
      add(data.data.history[0].parts[0].text, true);
    }
  }, []);

  return (
    <>
      {/* add new chat  */}
      {img.isLoading && "Loading...."}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={urlEndpoint}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: "380" }]}
        />
      )}

      {question && (
        <div className="p-5 bg-[#2c2937] rounded-[20px] max-w-[80%] self-end mt-7">
          {question}
        </div>
      )}
      {answer && (
        <div className="p-5">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div className="pb-27" ref={endRef} />

      <form
        action=""
        className="w-1/2 absolute bottom-0 bg-[#2c2937] rounded-[20px] flex  items-center gap-5 px-5"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Upload setImg={setImg} />
        <input type="file" multiple={false} id="file" hidden />
        <input
          type="text"
          name="text"
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
