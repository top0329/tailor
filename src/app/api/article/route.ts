import { apiHandler } from "@/app/_helpers/server/api";
import { prisma } from "@/app/_helpers/server/prisma";

module.exports = apiHandler({
  GET: getArticle,
});

async function getArticle() {
  const [count, randomArticle] = await Promise.all([
    prisma.articleData.count(),
    prisma.articleData.findMany({
      take: 1,
      orderBy: {
        id: "asc",
      },
      skip: Math.floor(Math.random() * (await prisma.articleData.count())),
    }),
  ]);

  return {
    totalArticles: count,
    article: randomArticle[0],
  };
}
