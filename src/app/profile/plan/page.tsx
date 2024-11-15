"use client";

import SubmitButton from "@/components/buttons/submit-button";
import AuthHeading from "@/components/shared/auth-heading";
import { createProfile } from "@/lib/actions";
import { useProfileStore } from "@/store/useProfileStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { profile, clearProfile } = useProfileStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (profile) {
        const result = await createProfile(profile);
        if (result.success) {
          clearProfile();
          router.push("/profile/en-test/id:1");
        }
      }
    } catch (err) {
      console.log(err);
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
