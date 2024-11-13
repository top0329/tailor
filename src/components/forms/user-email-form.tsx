"use client";

import { signup } from "@/lib/actions";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import GoogleButton from "../buttons/google-button";
import SubmitButton from "../buttons/submit-button";
import ErrorMsg from "../shared/error";
import { useRouter } from "next/navigation";

const EmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const UserEmailForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validate email before submission
      EmailSchema.parse({ email });
      const result = await signup(email);
      console.log(result);
      if (result.success)
        router.push(`/auth/otp?email=${encodeURIComponent(email)}`);
      else if (!result.success) setError(result.message);
    } catch (err) {
      console.log(err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[424px] w-full flex flex-col gap-[16px]">
      <GoogleButton isLoading={isLoading} />
      <p className="text-center">or</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <p className="text-m">Sign up with Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]"
          />
          <ErrorMsg error={error} />
        </div>
        <div className="flex flex-col gap-[12px]">
          <SubmitButton disabled={!email || isLoading} isLoading={isLoading} />
          <p className="text-s text-center">
            By continuing, you are agreeing to Reroute&apos;s
            <br />
            <Link href="#" className="underline text-highlight-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline text-highlight-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserEmailForm;
