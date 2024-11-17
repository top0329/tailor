"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCwIcon } from "lucide-react";

import UserFormWrapper from "../wrappers/user-form-wrapper";
import SubmitButton from "../buttons/submit-button";
import { cn } from "@/utils/cn";
import { useProfileStore } from "@/store/useProfileStore";
import ErrorMsg from "../shared/error";
import { InterestCategory } from "@prisma/client";

const InterestsForm = () => {
  const router = useRouter();
  const lists = [
    "Technology",
    "Music",
    "Politics",
    "Art",
    "Movies & TV",
    "Architecture",
    "Fantasy",
    "Gaming",
    "Philosophy",
    "Animals",
    "Fashion",
    "Biology",
    "Cooking",
    "Photography",
    "Gardening",
    "Sports",
    "Literature",
    "Chemistry",
    "World History",
    "Environment",
    "Physics",
    "Food",
    "Handicraft",
    "Engineering",
    "Travel",
    "Psychology",
    "Mathematics",
    "Health & Wellness",
    "Chinese Culture",
    "Science",
    "Western Culture",
    "Chinese Language",
    "Chinese History",
    "Astronomy",
    "English Language",
  ];

  const { profile, setProfile } = useProfileStore();

  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState<string[]>(
    profile?.interests || []
  );
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);
    setProfile({ ...profile, interests: interests as InterestCategory[] });
    if (!profile?.interests && !profile?.personalInfo)
      setErr("Please fill out all the personal information");
    setIsLoading(false);
    router.push("/profile/plan");
  };
  return (
    <UserFormWrapper>
      <div className='flex flex-col gap-[8px]'>
        <p className='text-h2 text-second-foreground font-[500]'>
          Let&apos;s get to know each other!
        </p>
        <div className='flex justify-between items-center'>
          <p className='text-h4 text-third-foreground'>
            To build your personal profile
          </p>
          <div className='flex items-center gap-[8px]'>
            <RotateCwIcon size={16} />
            <button
              type='button'
              className='text-third-foreground'
              onClick={() => setInterests([])}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-[16px] max-h-[500px] overflow-y-scroll scrollbar'>
        {lists.map((list, index) => {
          return (
            <button
              type='button'
              key={index}
              onClick={() => {
                setInterests((prev) =>
                  prev?.includes(list)
                    ? prev.filter((item) => item !== list)
                    : [...prev, list]
                );
              }}
              className={cn(
                "h-[120px] flex items-center justify-center p-[24px] border rounded-[12px]",
                interests.includes(list)
                  ? "border-highlight-stroke"
                  : "border-first-stroke"
              )}
            >
              {list}
            </button>
          );
        })}
      </div>
      <ErrorMsg error={err} />
      <div className='flex justify-between items-center'>
        <button
          className='flex items-center gap-[8px] px-[16px] py-[8px]'
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          <div className='text-third-foreground'>Back</div>
        </button>
        <SubmitButton
          className='w-[240px]'
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={!interests.length || isLoading}
        />
      </div>
    </UserFormWrapper>
  );
};

export default InterestsForm;
