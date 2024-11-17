import jwt from "jsonwebtoken";
import { headers } from "next/headers";

import { sendMail } from "@/utils/sendMail";
import { prisma } from "./prisma";
import { generateOTP, hashPassword } from "@/utils/password";
import { JWT_EXPIRES, JWT_SECRET } from "@/constants/env";
import { Profile } from "@/store/useProfileStore";
import { Gender } from "@prisma/client";

export const usersRepo = {
  create,
  verifyOTP,
  createPwd,
  createProfile,
};

async function create({
  email,
  registerType,
}: {
  email: string;
  registerType: string;
}) {
  const user = await prisma.user.findFirst({ where: { email } });

  if (registerType === "email") {
    if (user) {
      throw `Email "${email}" is already taken`;
    }
    const otp = generateOTP();
    await prisma.user.create({
      data: {
        email,
        otp,
        registerType: ["email"],
      },
    });
    const html = `<p>Hello,</p><p>Please verify your email address using the code below:</p><br /><strong>${otp}</strong><br /><p>This code will expire in 20 minutes for security reasons. If you did not attempt to log in to TailorGrow, please reset your password and contact our support team.</p><br /><p>If you have any questions, feel free to reach out to our support team.</p><br /><p>Thank you,</p><p>The TailorGrow Team</p>`;
    await sendMail(email, "TailorGrow Email Verification", html);
  }

  if ((registerType = "google")) {
    if (user) {
      return;
    }
    await prisma.user.create({
      data: {
        email,
        registerType: ["google"],
      },
    });
  }

  throw "Invalid register type!";
}

async function verifyOTP({ otp, email }: { otp: number; email: string }) {
  const user = await prisma.user.findUniqueOrThrow({ where: { email } });

  if (user.otp !== otp) {
    throw "Invalid OTP!";
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: true, otp: null },
  });

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });

  return { user, token };
}

async function createPwd({ pwd }: { pwd: string }) {
  try {
    const currentUserId = headers().get("userId");

    const currentUser = await prisma.user.findUniqueOrThrow({
      where: { id: currentUserId! },
    });

    if (!currentUser) {
      throw "Unauthorized!";
    }

    const hashPwd = await hashPassword(pwd);

    await prisma.user.update({
      where: { id: currentUserId! },
      data: { password: hashPwd },
    });
  } catch (err) {
    throw err;
  }
}
async function createProfile({ profile }: { profile: Profile }) {
  const { invitationCode, personalInfo, interests } = profile;
  const { firstName, lastName, gender, birth } = personalInfo!;

  try {
    const currentUserId = headers().get("userId");

    await prisma.userProfile.create({
      data: {
        invitationCode,
        firstName,
        lastName,
        gender: gender as Gender,
        birthDate: birth,
        interests: interests,
        user: {
          connect: {
            id: currentUserId!,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
