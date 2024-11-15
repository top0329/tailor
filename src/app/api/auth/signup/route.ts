import { sendMail } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  console.log("user =>", user);

  if (user) {
    return NextResponse.json(
      { message: "User already exists", success: false },
      { status: 409 }
    );
  }

  try {
    const otp = generateOTP();
    const html = `<p>Hello,</p><p>Please verify your email address using the code below:</p><br /><strong>${otp}</strong><br /><p>This code will expire in 20 minutes for security reasons. If you did not attempt to log in to TailorGrow, please reset your password and contact our support team.</p><br /><p>If you have any questions, feel free to reach out to our support team.</p><br /><p>Thank you,</p><p>The TailorGrow Team</p>`;
    sendMail(email, "TailorGrow Email Verification", html).catch((error) => {
      console.log("error => ", error);
      throw new Error(error);
    });

    prisma.user
      .create({
        data: {
          email,
          otp,
        },
      })
      .then()
      .catch((error) => {
        console.log("prisma error => ", error);
        throw new Error(error);
      });

    return NextResponse.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log("error => ", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
