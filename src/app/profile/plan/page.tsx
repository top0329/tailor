"use client";

import SubmitButton from "@/components/buttons/submit-button";
import AuthHeading from "@/components/shared/auth-heading";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/profile/test/id:1");
  };
  return (
    <div className="flex flex-col gap-[32px] justify-center items-center flex-1 bg-[url('/_static/')] text-center">
      <AuthHeading
        header="Let’s get started!"
        sub="Join us to explore the language world!"
      />
      <SubmitButton className="w-[240px]" text="Sure!" onClick={handleSubmit} />
    </div>
  );
};

export default Page;
