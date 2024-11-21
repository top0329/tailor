import { Section, PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

function validateAndTrim(value: any, maxLength: number): string {
  const stringValue = value?.toString() || "";
  return stringValue.slice(0, maxLength);
}

export async function importExcel(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  for (const worksheet of workbook.worksheets) {
    if (!worksheet.name.toLowerCase().startsWith("article")) {
      continue;
    }

    console.log(`Processing sheet: ${worksheet.name}`);

    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      const article = row.getCell(2).value?.toString() || "";
      const section = worksheet.name.split(" ")[1] as Section;
      if (article === "") continue;

      let articleData = await prisma.article.findFirst({
        where: {
          section: section,
          content: article,
        },
      });

      if (!articleData) {
        articleData = await prisma.article.create({
          data: {
            section: section,
            content: article,
          },
        });
      }

      await prisma.questionData.create({
        data: {
          articleId: articleData.id,
          competency: validateAndTrim(row.getCell(3).value, 50),
          no: Number(row.getCell(4).value),
          question: validateAndTrim(row.getCell(5).value, 500),
          a: validateAndTrim(row.getCell(6).value, 500),
          b: validateAndTrim(row.getCell(7).value, 500),
          c: validateAndTrim(row.getCell(8).value, 500),
          d: validateAndTrim(row.getCell(9).value, 500),
          best_answer: validateAndTrim(row.getCell(10).value, 500),
          explanation: row.getCell(11).value?.toString() || "",
        },
      });
    }
  }
}
