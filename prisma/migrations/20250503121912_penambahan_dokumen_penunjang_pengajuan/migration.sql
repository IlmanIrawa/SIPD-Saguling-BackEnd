/*
  Warnings:

  - A unique constraint covering the columns `[dokumenPenunjang]` on the table `Pengajuan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dokumenPenunjang` to the `Pengajuan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pengajuan" ADD COLUMN     "dokumenPenunjang" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pengajuan_dokumenPenunjang_key" ON "Pengajuan"("dokumenPenunjang");
