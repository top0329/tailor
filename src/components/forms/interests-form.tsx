"use client";

import { ArrowLeft, RotateCwIcon } from "lucide-react";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import SubmitButton from "../buttons/submit-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/useProfileStore";
import ErrorMsg from "../shared/error";

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
    setProfile({ ...profile, interests });
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
      <div className='grid grid-cols-2 md:grid-cols-3 gap-[16px]'>
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
                "flex items-center p-[24px] border rounded-[12px]",
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
