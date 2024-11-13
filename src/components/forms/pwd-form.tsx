"use client";

import { useState } from "react";
import AuthHeading from "../shared/auth-heading";
import ErrorMsg from "../shared/error";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import SubmitButton from "../buttons/submit-button";
import { useRouter } from "next/navigation";

const PwdForm = () => {
  const router = useRouter();
  const [error] = useState("");
  const handleSubmit = () => {
    router.push("/profile/invitation-code");
  };
  return (
    <UserFormWrapper>
      <AuthHeading
        header="Welcome to Reroute"
        sub="Please secure your account"
      />
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <p className="text-m">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]"
          />
          <ErrorMsg error={error} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-m">Re-type password</p>
          <input
            type="password"
            placeholder="Password"
            className="px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]"
          />
          <ErrorMsg error={error} />
        </div>
        <div className="text-right">
          <SubmitButton className="w-[240px]" onClick={handleSubmit} />
        </div>
      </div>
    </UserFormWrapper>
  );
};

export default PwdForm;
