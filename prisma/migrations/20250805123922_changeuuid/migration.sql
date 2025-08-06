/*
  Warnings:

  - The primary key for the `Tema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `temaId` on the `Recurso` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Tema` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Recurso" DROP CONSTRAINT "Recurso_temaId_fkey";

-- AlterTable
ALTER TABLE "Recurso" DROP COLUMN "temaId",
ADD COLUMN     "temaId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Tema" DROP CONSTRAINT "Tema_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Tema_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Recurso" ADD CONSTRAINT "Recurso_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
