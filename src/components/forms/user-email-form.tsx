"use client";

import { signup } from "@/lib/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import GoogleButton from "../buttons/google-button";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const UserEmailForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate email before submission
      emailSchema.parse({ email });
      const result = await signup(email);
      if (result.status === 201) redirect("/otpverification");
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
    <div className='max-w-[424px] w-full flex flex-col gap-[16px]'>
      <GoogleButton isLoading={isLoading} />
      <p className='text-center'>or</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-[32px]'>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-m'>Sign up with Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='Email'
            className='px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]'
          />
          {error && <span className='text-red-500 text-sm'>{error}</span>}
        </div>
        <div className='flex flex-col gap-[12px]'>
          <button
            type='submit'
            disabled={isLoading || !email}
            className={cn(
              "px-[16px] py-[8px] bg-highlight border-[1px] border-solid rounded-[80px] text-invert-foreground font-bold",
              email ? "" : "opacity-50"
            )}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
          <p className='text-s text-center'>
            By continuing, you are agreeing to Reroute&apos;s
            <br />
            <Link href='#' className='underline text-highlight-foreground'>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href='#' className='underline text-highlight-foreground'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserEmailForm;
