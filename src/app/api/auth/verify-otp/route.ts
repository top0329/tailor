import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ms from "ms";

import { AUTH_SECRET, JWT_EXPIRES } from "@/lib/constants";

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

      const tokenPayload = {
        user: user?.id,
      };

      const token = jwt.sign(tokenPayload, AUTH_SECRET, {
        expiresIn: JWT_EXPIRES,
      });

      const expires = new Date();

      expires.setMilliseconds(expires.getMilliseconds() + ms(JWT_EXPIRES));

      const res = NextResponse.json(
        { message: "OTP verified", success: true },
        { status: 200 }
      );

      res.cookies.set("Authentication", token, {
        expires,
        secure: true,
        httpOnly: true,
      });

      return res;
    }

    return NextResponse.json(
      { message: "Can't verify OTP", success: false },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid OTP", success: false },
      { status: 400 }
    );
  }
}
