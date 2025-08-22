/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "code" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");
