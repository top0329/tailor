"use client";

import SubmitButton from "@/app/_components/buttons/submit-button";
import AuthHeading from "@/app/_components/shared/auth-heading";
import { useUserService } from "@/app/_services";
import { useProfileService } from "@/app/_services";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const userService = useUserService();
  const { profile, clearProfile } = useProfileService();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("whataio");
    await userService.createProfile(profile!);
    clearProfile();
    router.push("/en-test/1");
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-[32px] justify-center items-center flex-1 bg-[url('/_static/bg-3.png')] text-center">
      <AuthHeading
        header='Let’s get started!'
        sub='Join us to explore the language world!'
      />
      <SubmitButton
        type='button'
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
