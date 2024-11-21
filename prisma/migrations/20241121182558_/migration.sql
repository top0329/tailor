-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'notanswer');

-- CreateEnum
CREATE TYPE "RegisterType" AS ENUM ('email', 'google');

-- CreateEnum
CREATE TYPE "InterestCategory" AS ENUM ('TECHNOLOGY', 'MUSIC', 'POLITICS', 'ART', 'MOVIES_TV', 'ARCHITECTURE', 'FANTASY', 'GAMING', 'PHILOSOPHY', 'ANIMALS', 'FASHION', 'BIOLOGY', 'COOKING', 'PHOTOGRAPHY', 'GARDENING', 'SPORTS', 'LITERATURE', 'CHEMISTRY', 'WORLD_HISTORY', 'ENVIRONMENT', 'PHYSICS', 'FOOD', 'HANDICRAFT', 'ENGINEERING', 'TRAVEL', 'PSYCHOLOGY', 'MATHEMATICS', 'HEALTH_WELLNESS', 'EDUCATION', 'CHINESE_CULTURE', 'SCIENCE', 'WESTERN_CULTURE', 'CHINESE_LANGUAGE', 'CHINESE_HISTORY', 'ASTRONOMY', 'ENGLISH_LANGUAGE');

-- CreateEnum
CREATE TYPE "Section" AS ENUM ('A', 'B', 'C');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "registerType" "RegisterType"[],
    "otp" INTEGER,
    "emailVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "invitationCode" VARCHAR(255),
    "firstName" VARCHAR(255) NOT NULL DEFAULT '',
    "lastName" VARCHAR(255) NOT NULL DEFAULT '',
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "interests" "InterestCategory"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionData" (
    "id" SERIAL NOT NULL,
    "competency" VARCHAR(50) NOT NULL,
    "no" INTEGER NOT NULL,
    "question" VARCHAR(500) NOT NULL,
    "a" VARCHAR(500) NOT NULL,
    "b" VARCHAR(500) NOT NULL,
    "c" VARCHAR(500) NOT NULL,
    "d" VARCHAR(500) NOT NULL,
    "best_answer" VARCHAR(500) NOT NULL,
    "explanation" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "QuestionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "section" "Section" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_invitationCode_key" ON "UserProfile"("invitationCode");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionData" ADD CONSTRAINT "QuestionData_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
