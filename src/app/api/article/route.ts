import { NextRequest, NextResponse } from "next/server";
import { Section } from "@prisma/client";

import { prisma } from "@/app/_helpers/server/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const section = searchParams.get("section") as Section | undefined;

  if (!section) {
    return NextResponse.json({ message: "Missing section" }, { status: 400 });
  }

  try {
    const randomArticle = await prisma.article.findMany({
      take: 1,
      where: {
        section: section,
      },
      orderBy: {
        id: "asc",
      },
      skip: Math.floor(Math.random() * 3),
    });

    if (randomArticle.length === 0) {
      return NextResponse.json(
        { message: "No article found" },
        { status: 404 }
      );
    }

    return NextResponse.json(randomArticle[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
