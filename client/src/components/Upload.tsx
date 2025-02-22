import React, { Dispatch, SetStateAction, useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { ImgData } from "./NewPrompt";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(
      `Authentication request failed: ${(error as Error).message}`
    );
  }
};

interface UploadProps {
  setImg: Dispatch<SetStateAction<ImgData>>;
}

const Upload: React.FC<UploadProps> = (props) => {
  const { setImg } = props;
  const IKUploadRef = useRef(null);
  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    setImg((prev) => {
      return { ...prev, dbData: res, isLoading: false };
    });
  };

  const onUploadProgress = (progress: any) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader?.result?.split(",")[1],
            mimeType: file?.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file)
  };
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {/* ...child components */}
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={IKUploadRef}
      />
      {
        <label
          className="rounded-full border-none bg-[#605e68] p-2.5 flex items-center justify-center cursor-pointer"
          onClick={() => IKUploadRef.current.click()}
        >
          <img src="/attachment.png" alt="" className="w-4 h-4 " />
        </label>
      }
    </IKContext>
  );
};

export default Upload;
