-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "registerType" VARCHAR(255),
    "otp" INTEGER,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "invitationCode" VARCHAR(255),
    "firstName" VARCHAR(255) DEFAULT '',
    "lastName" VARCHAR(255) DEFAULT '',
    "gender" "Gender",
    "birthDate" TIMESTAMP(3),
    "interests" TEXT[],
    "profileFilled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_invitationCode_key" ON "user"("invitationCode");
