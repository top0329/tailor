import { NextRequest, NextResponse } from "next/server";
import { getId } from "../../auth/get-id";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { profile } = await req.json();
  const id = await getId(req);

  const { invitationCode, personalInfo, interests } = profile;
  const { firstName, lastName, gender, birth } = personalInfo;

  if (!id)
    return NextResponse.json(
      { message: "User not found", success: false },
      { status: 500 }
    );

  try {
    await prisma.user.update({
      where: { id },
      data: {
        invitationCode,
        firstName,
        lastName,
        gender,
        birthDate: birth,
        interests,
      },
    });

    return NextResponse.json(
      { message: "Successfully registered profile", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
