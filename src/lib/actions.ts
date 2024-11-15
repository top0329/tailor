"use server";

import nodemailer from "nodemailer";
import { POST } from "./fetch";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { mailConfig } from "@/configs/mail-config";
import { BASE_URL, MAILING_EMAIL } from "./constants";
import { Profile } from "@/store/useProfileStore";

export const signup = async (email: string) =>
  await POST("auth/signup", { email });

export const sendPwd = async (pwd: string) => await POST("auth/pwd", { pwd });

export const createProfile = async (profile: Profile) =>
  await POST("user/profile", { profile });

export const verifyOtp = async (email: string, otp: number) => {
  const res = await fetch(`${BASE_URL}auth/verify-otp`, {
    method: "POST",
    body: JSON.stringify({ email, otp }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  setAuthCookie(res);
  return await res.json();
};

const setAuthCookie = (response: Response) => {
  console.log("response", response);
  console.log("response headers", response.headers);
  const setCookieHeader = response.headers?.get("Set-Cookie");
  console.log(setCookieHeader);
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};

const transporter = nodemailer.createTransport(mailConfig);

export const sendMail = (email: string, subject: string, html: string) => {
  return transporter.sendMail({
    from: MAILING_EMAIL,
    to: email,
    subject,
    html,
  });
};
