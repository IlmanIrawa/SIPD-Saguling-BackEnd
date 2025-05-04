/*
  Warnings:

  - The values [PENGANTARAN] on the enum `StatusPengajuan` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `lampiran` to the `Lapor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nohp` to the `Lapor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPengajuan_new" AS ENUM ('PENDING', 'ON_PROCESS', 'MENUNGGU_TTD', 'SELESAI');
ALTER TABLE "Pengajuan" ALTER COLUMN "statusPengajuan" DROP DEFAULT;
ALTER TABLE "Pengajuan" ALTER COLUMN "statusPengajuan" TYPE "StatusPengajuan_new" USING ("statusPengajuan"::text::"StatusPengajuan_new");
ALTER TYPE "StatusPengajuan" RENAME TO "StatusPengajuan_old";
ALTER TYPE "StatusPengajuan_new" RENAME TO "StatusPengajuan";
DROP TYPE "StatusPengajuan_old";
ALTER TABLE "Pengajuan" ALTER COLUMN "statusPengajuan" SET DEFAULT 'ON_PROCESS';
COMMIT;

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'FO';

-- AlterTable
ALTER TABLE "Lapor" ADD COLUMN     "lampiran" TEXT NOT NULL,
ADD COLUMN     "nohp" TEXT NOT NULL;
