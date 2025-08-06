/*
  Warnings:

  - A unique constraint covering the columns `[passwordResetToken]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "passwordResetExpires" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_passwordResetToken_key" ON "usuarios"("passwordResetToken");
