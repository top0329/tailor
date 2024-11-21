import { apiHandler } from "@/app/_helpers/server/api";
import { prisma } from "@/app/_helpers/server/prisma";

module.exports = apiHandler({
  GET: getQuestionData,
});

async function getQuestionData(req: Request) {
  const url = new URL(req.url);
  const articleId = url.pathname.split("/").pop();

  if (!articleId || isNaN(Number(articleId))) {
    return {
      status: 400,
      body: {
        message: "Missing articleId",
      },
    };
  }

  const questionData = await prisma.questionData.findMany({
    where: {
      articleId: Number(articleId),
    },
  });
  return questionData;
}
