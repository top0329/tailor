"use client";

import React, { useRef, useState } from "react";
import SubmitButton from "../buttons/submit-button";
import { z } from "zod";
import ErrorMsg from "../shared/error";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // if you're not using Typescript, simply do const inputRef = useRef()

  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  // if you're not using Typescript, do useState()
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (input: string, index: number) => {
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

  const handleSubmit = () => {
    setIsLoading(true);

    try {
      FormSchema.safeParse({ pin: OTP.join("") });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setError("");

    try {
      // Validate email before submission
      FormSchema.safeParse({ pin: OTP.join("") });

      //To Do Verify OTP funtion
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[32px] flex-1 rounded-[16px]">
      <div className="flex flex-col gap-[8px]">
        <p className="text-h2 text-second-foreground font-[500]">
          Welcome to Reroute
        </p>
        <p className="text-h4 text-third-foreground">
          Please Verify Your Email
        </p>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-m">Verification code</p>
        <div className="flex gap-[8px]">
          {Array.from({ length }, (_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={OTP[index]}
              onChange={(e) => handleTextChange(e.target.value, index)}
              ref={(ref) => {
                if (ref) inputRef.current[index] = ref;
              }}
              className="w-[64px] h-[48px] text-center border-[1px] border-first-stroke rounded-[8px]"
            />
          ))}
        </div>
        <ErrorMsg error={error} />
      </div>
      <div className="text-right">
        <SubmitButton
          type="button"
          disabled={false}
          isLoading={isLoading}
          className="w-[240px]"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default OTPInput;
