import { Level, PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

function validateAndTrim(value: any, maxLength: number): string {
  const stringValue = value?.toString() || "";
  return stringValue.slice(0, maxLength);
}

export async function importExcel(filePath: string, sheetName: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    throw new Error(`Worksheet "${sheetName}" not found in the workbook.`);
  }

  // Process rows sequentially
  for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
    const row = worksheet.getRow(rowNumber);
    const article = row.getCell(2).value?.toString() || "";
    const level = sheetName.split(" ")[1] as Level;
    if (article === "") break;

    // Check if article exists
    let articleData = await prisma.articleData.findFirst({
      where: {
        level: level,
        article: article,
      },
    });

    // If article doesn't exist, create new TestData
    if (!articleData) {
      articleData = await prisma.articleData.create({
        data: {
          level: level,
          article: article,
        },
      });
    }

    // Create question for existing or new TestData
    await prisma.questionData.create({
      data: {
        articleDataId: articleData.id,
        competency: validateAndTrim(row.getCell(3).value, 50),
        no: Number(row.getCell(4).value),
        question: validateAndTrim(row.getCell(5).value, 500),
        a: validateAndTrim(row.getCell(6).value, 500),
        b: validateAndTrim(row.getCell(7).value, 500),
        c: validateAndTrim(row.getCell(8).value, 500),
        d: validateAndTrim(row.getCell(9).value, 500),
        best_answer: validateAndTrim(row.getCell(10).value, 500),
        explanation: row.getCell(11).value?.toString() || "",
        amy: validateAndTrim(row.getCell(12).value, 500),
        ip: validateAndTrim(row.getCell(13).value, 500),
        status: row.getCell(14).value === "TRUE" ? true : false,
      },
    });
  }
}
