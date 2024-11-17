"use client";

import SubmitButton from "@/app/_components/buttons/submit-button";
import AuthHeading from "@/app/_components/shared/auth-heading";
import { useUserService } from "@/app/_services";
import { useProfileStore } from "@/store/useProfileStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const userService = useUserService();
  const { profile, clearProfile } = useProfileStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (profile) {
      await userService.createProfile(profile);
      clearProfile();
      router.push("/en-test/1");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-[32px] justify-center items-center flex-1 bg-[url('/_static/')] text-center">
      <AuthHeading
        header='Let’s get started!'
        sub='Join us to explore the language world!'
      />
      <SubmitButton
        className='w-[240px]'
        text='Sure!'
        onClick={handleSubmit}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Page;
