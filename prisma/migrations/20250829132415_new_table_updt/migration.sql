/*
  Warnings:

  - Added the required column `orden` to the `ClaseBonus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClaseBonus" ADD COLUMN     "orden" INTEGER NOT NULL;
