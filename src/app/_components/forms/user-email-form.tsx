"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import GoogleButton from "../buttons/google-button";
import SubmitButton from "../buttons/submit-button";
import ErrorMsg from "../shared/error";
import { EmailregEx } from "@/constants/regEx";
import { useUserService } from "@/app/_services";
import { cn } from "@/utils/cn";

export default UserEmailForm;

function UserEmailForm() {
  const userService = useUserService();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    email: register("email", {
      required: "Email is required",
      pattern: { value: EmailregEx, message: "Invalid email address" },
      validate: {
        notAdmin: (value: string) =>
          !value.includes("admin") || "Email cannot contain admin",
      },
    }),
  };

  async function onSubmit(user: any) {
    await userService.register(user);
  }

  return (
    <div className="max-w-[424px] w-full flex flex-col gap-[16px]">
      <GoogleButton isLoading={formState.isSubmitting} />
      <p className="text-center">or</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[32px]"
      >
        <div className="flex flex-col gap-[8px]">
          <p className="text-m">Sign up with Email</p>
          <input
            {...fields.email}
            type="text"
            placeholder="Email Address"
            className={cn(
              "px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]",
              errors.email && "outline-negative-stroke"
            )}
          />
          {errors.email && (
            <ErrorMsg error={errors.email.message?.toString() || ""} />
          )}
        </div>
        <div className="flex flex-col gap-[12px]">
          <SubmitButton
            disabled={formState.isSubmitting}
            isLoading={formState.isSubmitting}
          />
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
}
