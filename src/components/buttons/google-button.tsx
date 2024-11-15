"use client";

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const GoogleButton = ({ isLoading }: { isLoading: boolean }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  return (
    <button
      className="px-[24px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[80px]"
      onClick={() => {
        setIsGoogleLoading(true);
        signIn("google");
      }}
      disabled={isLoading}
    >
      <div className="flex justify-center items-center gap-[16px]">
        {isGoogleLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Image
            src="/_static/google.png"
            width={24}
            height={24}
            alt="GoogleIcon"
          />
        )}
        <p>Continue with Google</p>
      </div>
    </button>
  );
};

export default GoogleButton;
