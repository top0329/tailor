"use server";

import nodemailer from "nodemailer";

const MAILING_EMAIL = process.env.MAILING_EMAIL;

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_API_URL;

export const signup = async (email: string) => {
  const res = await fetch(`${BASE_URL}auth/signup`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

const mailConfig = {
  host: process.env.MAILING_HOST || "",
  port: parseInt(process.env.MAILING_PORT || ""),
  secure: process.env.MAILING_SECURE === "true",
  auth: {
    user: process.env.MAILING_EMAIL || "",
    pass: process.env.MAILING_PASSWORD || "",
  },
};

const transporter = nodemailer.createTransport(mailConfig);

export const sendMail = async (
  email: string,
  subject: string,
  html: string
) => {
  return transporter.sendMail({
    from: MAILING_EMAIL,
    to: email,
    subject,
    html,
  });
};

export const verifyOtp = async (email: string, otp: number) => {
  const res = await fetch(`${BASE_URL}auth/verify-otp`, {
    method: "POST",
    body: JSON.stringify({ email: email, otp: otp }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
