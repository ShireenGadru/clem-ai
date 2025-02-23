import React, { useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { authenticator } from "../lib/IKAuth";
import { IUploadProps } from "../types/data.types";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const Upload: React.FC<IUploadProps> = (props) => {
  const { setImg } = props;
  const IKUploadRef = useRef<HTMLInputElement | null>(null);
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
            data: (reader?.result as string).split(",")[1],
            mimeType: file?.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (IKUploadRef.current) IKUploadRef.current.click();
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
          onClick={handleUpload}
        >
          <img src="/attachment.png" alt="" className="w-4 h-4 " />
        </label>
      }
    </IKContext>
  );
};

export default Upload;
