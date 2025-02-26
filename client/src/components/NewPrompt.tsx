import React, { FormEvent, useEffect, useRef, useState } from "react";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImgData, INewPromptProps } from "../types/data.types";
import { Part } from "@google/generative-ai";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const APIendpoint = import.meta.env.VITE_API_URL;

const NewPrompt: React.FC<INewPromptProps> = ({ data }) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [img, setImg] = useState<ImgData>({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: "",
  });

  const chat = model.startChat({
    history: data?.history.map(
      ({ role, parts }: { role: string; parts: Part[] }) => ({
        role,
        parts: [{ text: parts[0].text }],
      })
    ),
  });

  const endRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // useEffect(() => {
  //   if (endRef?.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [data, question, answer, img]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await fetch(`${APIendpoint}/api/chats/${data?._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question || undefined,
          answer,
          img: img.dbData?.filePath || undefined,
          category,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data?._id] })
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
      let completeResponse = "";
      let extractedCategory = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        completeResponse += chunkText;
        const categoryMatch = completeResponse.match(/<<<(.*?)>>>/);
        if (categoryMatch) {
          extractedCategory = categoryMatch[1];
          completeResponse = completeResponse.replace(/<<<.*?>>>/, "");
        }
        setAnswer(completeResponse);
        const finalCategory = extractedCategory ?? "other";
        setCategory(finalCategory);
      }
      mutate();
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
    if (data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true);
    }
    console.log(endRef?.current);
  }, []);

  return (
    <div className="flex flex-col">
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

      <div className="pb-4" ref={endRef} />

      <form
        action=""
        className="md:mb-5 bg-[#131619] rounded-[20px] flex items-center gap-5 px-5 border border-white/40"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Upload setImg={setImg} />
        <input type="file" multiple={false} id="file" hidden />
        <input
          type="text"
          name="text"
          placeholder="Ask something..."
          className="flex-1 py-3 md:p-5 bg-transparent border-none outline-none text-[#ececec] text-xm md:text-base"
        />
        <button className="md:mr-5 cursor-pointer rounded-full border-none bg-[#605e68] p-2.5 flex items-center justify-center">
          <img src="/arrow.png" alt="" className="w-3 h-3 md:w-4 md:h-4 " />
        </button>
      </form>
    </div>
  );
};

export default NewPrompt;
