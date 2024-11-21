import { PrismaClient } from "@prisma/client";
import { importExcel } from "./import-xlsx";

const prisma = new PrismaClient();

async function main() {
  console.log("Start importing data from excel...");
  await importExcel("public/_static/data.xlsx");
  console.log("Successfully imported data from excel!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
