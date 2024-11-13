import { sendMail } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  console.log("user =>", user);

  if (user) {
    return Response.json(
      { message: "User already exists", success: false },
      { status: 409 }
    );
  }

  try {
    const otp = generateOTP();
    const html = `<p>Your verification code is ${otp}</p>`;
    await sendMail(email, "Verify your email", html);

    await prisma.user.create({
      data: {
        email,
        otp,
      },
    });

    return Response.json(
      { message: "User created successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log("error => ", error instanceof Error ? error.message : error);
    return Response.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
