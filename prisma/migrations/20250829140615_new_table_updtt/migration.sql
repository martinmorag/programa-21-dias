/*
  Warnings:

  - You are about to drop the `_ClaseBonusToPlan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `planId` to the `ClaseBonus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClaseBonusToPlan" DROP CONSTRAINT "_ClaseBonusToPlan_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClaseBonusToPlan" DROP CONSTRAINT "_ClaseBonusToPlan_B_fkey";

-- AlterTable
ALTER TABLE "ClaseBonus" ADD COLUMN     "planId" UUID NOT NULL;

-- DropTable
DROP TABLE "_ClaseBonusToPlan";

-- AddForeignKey
ALTER TABLE "ClaseBonus" ADD CONSTRAINT "ClaseBonus_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
