/*
  Warnings:

  - You are about to drop the column `dok` on the `Pengajuan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lampiran]` on the table `Pengajuan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lampiran` to the `Pengajuan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pengajuan_dok_key";

-- AlterTable
ALTER TABLE "Pengajuan" DROP COLUMN "dok",
ADD COLUMN     "lampiran" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pengajuan_lampiran_key" ON "Pengajuan"("lampiran");
