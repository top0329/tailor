"use client";

import React, { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import SubmitButton from "../buttons/submit-button";
import AuthHeading from "../shared/auth-heading";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import { useUserService } from "@/app/_services";
import { useForm } from "react-hook-form";

type InputProps = {
  length?: number;
};

const OTPInput = ({ length = 6 }: InputProps) => {
  const userService = useUserService();
  const searchParams = useSearchParams();

  const { handleSubmit, formState } = useForm();

  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  const queryEmail = searchParams.get("email") ?? "";
  console.log("email => ", queryEmail);

  const handleTextChange = (input: string, index: number) => {
    if (!/^\d*$/.test(input)) {
      return;
    }
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  async function onSubmit() {
    const otp = OTP.join("");
    const res = await userService.verifyOTP(otp, queryEmail);
    console.log("res => ", res);
  }

  return (
    <UserFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <AuthHeading header='Welcome to Reroute' sub='Please verify your email' />
      <div className='flex flex-col gap-[8px]'>
        <p className='text-m'>Verification code</p>
        <div className='flex justify-between gap-[8px]'>
          {Array.from({ length }, (_, index) => (
            <input
              key={index}
              type='text'
              maxLength={1}
              value={OTP[index]}
              onChange={(e) => handleTextChange(e.target.value, index)}
              ref={(ref) => {
                if (ref) inputRef.current[index] = ref;
              }}
              className='h-[48px] w-full text-center border-[1px] border-first-stroke rounded-[8px]'
            />
          ))}
        </div>
      </div>
      <div className='text-right'>
        <SubmitButton
          type='submit'
          disabled={OTP.join("").length !== 6 || formState.isSubmitting}
          isLoading={formState.isSubmitting}
          className='w-[240px]'
        />
      </div>
    </UserFormWrapper>
  );
};

export default OTPInput;
