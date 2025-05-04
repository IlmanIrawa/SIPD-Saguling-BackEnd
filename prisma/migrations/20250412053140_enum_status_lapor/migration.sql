-- CreateEnum
CREATE TYPE "statusLapor" AS ENUM ('MENUNGGU', 'PROSESS', 'DITINDAK_LANJUTI');

-- AlterTable
ALTER TABLE "Lapor" ADD COLUMN     "statusLapor" "statusLapor" NOT NULL DEFAULT 'MENUNGGU';
