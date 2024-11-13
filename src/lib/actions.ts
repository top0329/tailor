"use server";

import { Resend } from "resend";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const signup = async (email: string) => {
  return await fetch(`${BASE_URL}auth/signup`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const sendMail = async (
  email: string,
  subject: string,
  html: string
) => {
  return resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject,
    html,
  });
};

export const verifyOtp = async (email: string, otp: number) => {
  return await fetch(`${BASE_URL}auth/verify-otp`, {
    method: "POST",
    body: JSON.stringify({ email: email, otp: otp }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
