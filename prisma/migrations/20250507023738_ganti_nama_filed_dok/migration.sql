/*
  Warnings:

  - You are about to drop the column `dokumenPenunjang` on the `Pengajuan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dok]` on the table `Pengajuan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dok` to the `Pengajuan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pengajuan_dokumenPenunjang_key";

-- AlterTable
ALTER TABLE "Pengajuan" DROP COLUMN "dokumenPenunjang",
ADD COLUMN     "dok" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pengajuan_dok_key" ON "Pengajuan"("dok");
