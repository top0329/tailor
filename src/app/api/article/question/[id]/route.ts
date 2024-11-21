import Joi from "joi";
import { apiHandler } from "@/app/_helpers/server/api";
import { prisma } from "@/app/_helpers/server/prisma";

module.exports = apiHandler({
  GET: getQuestionData,
});

async function getQuestionData(req: Request) {
  const url = new URL(req.url);
  const articleId = url.pathname.split("/").pop();
  console.log(articleId);
  const questionData = await prisma.questionData.findMany({
    where: {
      articleDataId: Number(articleId),
    },
  });
  console.log(questionData);
  return questionData;
}
