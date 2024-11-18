import ExcelJS from "exceljs";

enum CompetencyType {
  Identifying_specifics,
  Comprehending_paragraph_ideas,
  Summarising,
  Vocabulary_Knowledge,
  Referencing,
  Synthesising_information_across_paragraph,
}

enum DifficultyType {
  Beginner,
  Intermediate,
  Advanced,
}

enum AnswerType {
  a,
  b,
  c,
  d,
}

interface SheetData {
  id: number;
  article: string;
  questions: Question[];
}

interface Question {
  id: number;
  competency: CompetencyType[];
  difficulty: DifficultyType[];
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: string;
  criticalThinking: boolean;
}

export async function importExcel(filePath: string, sheetName: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(sheetName);
  const data: SheetData[] = [];

  const column = worksheet?.getColumn(3);
  let id = 1;

  if (column) {
    column.eachCell((cell, rowNumber) => {
      if (rowNumber > 1 && typeof cell.value === "number") {
        id++;
        const article = worksheet?.getCell(rowNumber, 3).value;
        console.log(
          "id and article ===============================================================> ",
          id,
          article
        );
      }
    });
  }
}
