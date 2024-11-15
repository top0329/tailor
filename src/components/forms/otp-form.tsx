"use client";

import React, { useRef, useState } from "react";
import SubmitButton from "../buttons/submit-button";
import { z } from "zod";
import ErrorMsg from "../shared/error";
import { verifyOtp } from "@/lib/actions";
import { useRouter, useSearchParams } from "next/navigation";
import AuthHeading from "../shared/auth-heading";
import UserFormWrapper from "../wrappers/user-form-wrapper";

// declare type for the props

type InputProps = {
  length?: number;
};

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTPInput = ({ length = 6 }: InputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const queryEmail = searchParams.get("email") ?? "";
  console.log("email => ", queryEmail);
  // if you're not using Typescript, simply do const inputRef = useRef()

  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  // if you're not using Typescript, do useState()
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

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

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Validate email before submission
      const pin = OTP.join("");
      FormSchema.parse({ pin });
      const result = await verifyOtp(queryEmail, parseInt(pin));
      if (result.success) {
        router.push("/auth/pwd");
      } else if (!result.success) setError(result.message);
    } catch (err) {
      console.log(err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserFormWrapper>
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
        <ErrorMsg error={error} />
      </div>
      <div className='text-right'>
        <SubmitButton
          type='submit'
          disabled={OTP.join("").length !== 6 || isLoading}
          isLoading={isLoading}
          className='w-[240px]'
          onClick={handleSubmit}
        />
      </div>
    </UserFormWrapper>
  );
};

export default OTPInput;
