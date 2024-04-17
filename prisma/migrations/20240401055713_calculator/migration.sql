/*
  Warnings:

  - Added the required column `tagline` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "tagline" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Calculator" (
    "id" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,

    CONSTRAINT "Calculator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calculator_name_key" ON "Calculator"("name");
