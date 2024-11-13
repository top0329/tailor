"use client";

import { ArrowLeft, RotateCwIcon } from "lucide-react";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import SubmitButton from "../buttons/submit-button";
import { useRouter } from "next/navigation";

const PreferForm = () => {
  const router = useRouter();
  const lists = [
    "Technology",
    "Art",
    "Fantasy",
    "Animal",
    "Cooking",
    "Sports",
    "News",
    "Nature",
    "Language",
    "Economic",
    "Travel",
    "Foodie",
  ];

  const handleSubmit = () => {
    router.push("/profile/plan");
  };
  return (
    <UserFormWrapper>
      <div className="flex flex-col gap-[8px]">
        <p className="text-h2 text-second-foreground font-[500]">
          Let&apos;s get to know each other!
        </p>
        <div className="flex justify-between items-center">
          <p className="text-h4 text-third-foreground">
            To build your personal profile
          </p>
          <div className="flex items-center gap-[8px]">
            <RotateCwIcon size={16} />
            <p className="text-third-foreground">Refresh</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[16px]">
        {lists.map((list, index) => {
          return (
            <div
              key={index}
              className="flex items-center p-[24px] border border-first-stroke rounded-[12px]"
            >
              {list}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <button className="flex items-center gap-[8px] px-[16px] py-[8px]">
          <ArrowLeft size={16} />
          <button
            className="text-third-foreground"
            onClick={() => router.back()}
          >
            Back
          </button>
        </button>
        <SubmitButton onClick={handleSubmit} />
      </div>
    </UserFormWrapper>
  );
};

export default PreferForm;
