import { PrismaClient } from "@prisma/client";
import { importExcel } from "./import-xlsx";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");
  await importExcel("public/_static/data.xlsx", "Article C selections");
  console.log("Seed completed");
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
