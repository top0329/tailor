import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getId } from "../get-id";
import { hashPassword } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { pwd } = await req.json();

  try {
    const user = await getId(req);

    const hash = await hashPassword(pwd);

    await prisma.user.update({
      where: { id: user },
      data: { password: hash },
    });

    return NextResponse.json(
      { message: "Password registered successfully", success: true },
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
