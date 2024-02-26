import Image from "next/image";
import defaultImage from "@/app/assets/default.png";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Button } from "@nextui-org/react";

interface UploadPageProps {
  setValue: UseFormSetValue<{
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    avatar?: string | null | undefined;
  }>;
}

const UploadUserImage = ({ setValue }: UploadPageProps) => {
  const [publicId, setPublicId] = useState("");

  return (
    <div className="flex justify-between items-center gap-2">
      {publicId ? (
        <CldImage
          crop="fill"
          src={publicId}
          width={120}
          height={120}
          alt="image"
        />
      ) : (
        <Image
          width={80}
          src={defaultImage}
          alt="image"
          className="rounded-full"
        />
      )}

      <CldUploadWidget
        uploadPreset="j5wl1xz7"
        onSuccess={(result) => {
          const info = result.info as { public_id: string };
          setPublicId(info.public_id);
          setValue("avatar", info.public_id);
        }}
        options={{
          sources: ["local"],
          maxFiles: 1,
          multiple: false,
          croppingAspectRatio: 1,
          showSkipCropButton: false,
        }}
      >
        {({ open }) => (
          <Button
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
          >
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadUserImage;
