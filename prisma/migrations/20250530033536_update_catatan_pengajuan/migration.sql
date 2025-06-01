-- AlterEnum
ALTER TYPE "StatusPengajuan" ADD VALUE 'TOLAK';

-- AlterTable
ALTER TABLE "Pengajuan" ADD COLUMN     "catatan" TEXT NOT NULL DEFAULT '-';
