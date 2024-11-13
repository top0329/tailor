import { clsx, type ClassValue } from "clsx";
import { createHash, randomBytes } from "crypto";
import { twMerge } from "tailwind-merge";
// import nodemailer from "nodemailer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOTP(): string {
  return randomBytes(3).toString("hex").toUpperCase();
}

export function hashOTP(otp: string, email: string): string {
  return createHash("sha256")
    .update(otp + email)
    .digest("hex");
}
