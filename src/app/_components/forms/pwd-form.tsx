"use client";

import React from "react";
import { useForm } from "react-hook-form";

import AuthHeading from "../shared/auth-heading";
import ErrorMsg from "../shared/error";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import SubmitButton from "../buttons/submit-button";
import { PassRegEx } from "@/constants/regEx";
import { cn } from "@/utils/cn";
import { useUserService } from "@/app/_services";

const PwdForm = () => {
  const userService = useUserService();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    pwd: register("pwd", {
      required: "Password is required!",
      pattern: {
        value: PassRegEx,
        message:
          "Password must contain at least 8 chars including upper/lowercase, special chars and number",
      },
    }),
    pwdConfirm: register("pwdConfirm", {
      required: "Password is required!",
      validate: (
        value: string,
        formValues: Record<string, any>
      ): string | boolean =>
        value === formValues.pwd || "Password does not match",
    }),
  };

  async function onSubmit(data: any) {
    try {
      await userService.createPwd(data.pwdConfirm);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <UserFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <AuthHeading
        header='Welcome to Reroute'
        sub='Please secure your account'
      />
      <div className='flex flex-col gap-[32px]'>
        <div className='flex flex-col gap-[8px]'>
          <label className='text-m'>Password</label>
          <input
            {...fields.pwd}
            type='password'
            placeholder='Password'
            className={cn(
              "px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]",
              errors.pwd && "outline-negative-stroke"
            )}
          />
          <ErrorMsg error={errors.pwd?.message as string} />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <p className='text-m'>Re-type password</p>
          <input
            {...fields.pwdConfirm}
            type='password'
            placeholder='Password'
            className={cn(
              "px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]",
              errors.pwdConfirm && "outline-negative-stroke"
            )}
          />
          <ErrorMsg error={errors.pwdConfirm?.message as string} />
        </div>
        <div className='text-right'>
          <SubmitButton
            className='w-[240px]'
            isLoading={formState.isSubmitting}
            disabled={formState.isSubmitting}
          />
        </div>
      </div>
    </UserFormWrapper>
  );
};
export default PwdForm;
