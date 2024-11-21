import { NextRequest } from "next/server";
import { Section } from "@prisma/client";

import { apiHandler } from "@/app/_helpers/server/api";
import { prisma } from "@/app/_helpers/server/prisma";

module.exports = apiHandler({
  GET: getArticle,
});

async function getArticle(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const section = searchParams.get("section") as Section | undefined;
  if (!section) {
    return {
      status: 400,
      body: {
        message: "Missing section",
      },
    };
  }
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

  return randomArticle[0];
}
