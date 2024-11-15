"use client";

import React, { useState } from "react";
import AuthHeading from "../shared/auth-heading";
import ErrorMsg from "../shared/error";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import SubmitButton from "../buttons/submit-button";
import { useRouter } from "next/navigation";
import { PassRegEx } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { sendPwd } from "@/lib/actions";

const PwdForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await sendPwd(password);
      if (result.success) router.push("/profile/invitation-code");
      else setErr(result.message);
    } catch (err) {
      console.log(err);
      setErr("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const passValid = password && !PassRegEx.test(password);

  return (
    <UserFormWrapper>
      <AuthHeading
        header='Welcome to Reroute'
        sub='Please secure your account'
      />
      <div className='flex flex-col gap-[32px]'>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-m'>Password</p>
          <input
            type='password'
            placeholder='Password'
            className={cn(
              "px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]",
              passValid && "focus:outline-negative-stroke"
            )}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passValid && (
            <ErrorMsg error='Password must contain at least 8 chars including upper/lowercase, special chars and number' />
          )}
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-m'>Re-type password</p>
          <input
            type='password'
            placeholder='Password'
            className={cn(
              "px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]",
              password &&
                confirmPassword &&
                (password !== confirmPassword ||
                  !PassRegEx.test(confirmPassword)) &&
                "focus:outline-negative-stroke"
            )}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password && confirmPassword && (
            <React.Fragment>
              {password !== confirmPassword ? (
                <ErrorMsg error="Password doesn't match" />
              ) : (
                !PassRegEx.test(confirmPassword) && (
                  <ErrorMsg error='Password must contain at least 8 chars including upper/lowercase, special chars and number' />
                )
              )}
            </React.Fragment>
          )}
        </div>
        <ErrorMsg error={err} />
        <div className='text-right'>
          <SubmitButton
            className='w-[240px]'
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              !password ||
              !confirmPassword ||
              !PassRegEx.test(confirmPassword) ||
              password !== confirmPassword ||
              isLoading
            }
          />
        </div>
      </div>
    </UserFormWrapper>
  );
};

export default PwdForm;
