-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'notanswer');

-- CreateEnum
CREATE TYPE "RegisterType" AS ENUM ('email', 'google');

-- CreateEnum
CREATE TYPE "InterestCategory" AS ENUM ('TECHNOLOGY', 'MUSIC', 'POLITICS', 'ART', 'MOVIES_TV', 'ARCHITECTURE', 'FANTASY', 'GAMING', 'PHILOSOPHY', 'ANIMALS', 'FASHION', 'BIOLOGY', 'COOKING', 'PHOTOGRAPHY', 'GARDENING', 'SPORTS', 'LITERATURE', 'CHEMISTRY', 'WORLD_HISTORY', 'ENVIRONMENT', 'PHYSICS', 'FOOD', 'HANDICRAFT', 'ENGINEERING', 'TRAVEL', 'PSYCHOLOGY', 'MATHEMATICS', 'HEALTH_WELLNESS', 'EDUCATION', 'CHINESE_CULTURE', 'SCIENCE', 'WESTERN_CULTURE', 'CHINESE_LANGUAGE', 'CHINESE_HISTORY', 'ASTRONOMY', 'ENGLISH_LANGUAGE');

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_invitationCode_key" ON "UserProfile"("invitationCode");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
