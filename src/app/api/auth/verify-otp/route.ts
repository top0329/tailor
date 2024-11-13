import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user?.otp === otp) {
      await prisma.user.update({
        where: { email },
        data: { emailVerified: true, otp: null },
      });
      return NextResponse.json(
        { message: "OTP verified", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid OTP", success: false },
      { status: 400 }
    );
  }
}
