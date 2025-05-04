-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusHidup" AS ENUM ('HIDUP', 'MENINGGAL');

-- CreateEnum
CREATE TYPE "StatusPengajuan" AS ENUM ('ON_PROCESS', 'PENGANTARAN', 'SELESAI');

-- CreateEnum
CREATE TYPE "AsetStatus" AS ENUM ('ADA', 'HILANG', 'RUSAK');

-- CreateEnum
CREATE TYPE "UsulSanggah" AS ENUM ('LAYAK', 'TIDAK_LAYAK');

-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "nik" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "pendidikan" TEXT NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "perkawinan" TEXT NOT NULL,
    "statusHidup" "StatusHidup" NOT NULL DEFAULT 'HIDUP',
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Pengajuan" (
    "pengajuanid" SERIAL NOT NULL,
    "nik" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "ktp" TEXT NOT NULL,
    "kk" TEXT NOT NULL,
    "keperluan" TEXT NOT NULL,
    "statusPengajuan" "StatusPengajuan" NOT NULL DEFAULT 'ON_PROCESS',

    CONSTRAINT "Pengajuan_pkey" PRIMARY KEY ("pengajuanid")
);

-- CreateTable
CREATE TABLE "Berita" (
    "beritaid" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gambar" TEXT NOT NULL,
    "isiBerita" TEXT NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("beritaid")
);

-- CreateTable
CREATE TABLE "Lapor" (
    "laporid" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "isi_laporan" TEXT NOT NULL,

    CONSTRAINT "Lapor_pkey" PRIMARY KEY ("laporid")
);

-- CreateTable
CREATE TABLE "Aset" (
    "asetid" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggal_beli" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "harga" DOUBLE PRECISION NOT NULL,
    "statusAset" "AsetStatus" NOT NULL DEFAULT 'ADA',
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "Aset_pkey" PRIMARY KEY ("asetid")
);

-- CreateTable
CREATE TABLE "Sosial" (
    "sosialid" SERIAL NOT NULL,
    "nik" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenis_bantuan" TEXT NOT NULL,
    "usulSanggah" "UsulSanggah" NOT NULL DEFAULT 'LAYAK',

    CONSTRAINT "Sosial_pkey" PRIMARY KEY ("sosialid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nik_key" ON "User"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pengajuan_ktp_key" ON "Pengajuan"("ktp");

-- CreateIndex
CREATE UNIQUE INDEX "Pengajuan_kk_key" ON "Pengajuan"("kk");

-- AddForeignKey
ALTER TABLE "Pengajuan" ADD CONSTRAINT "Pengajuan_nik_fkey" FOREIGN KEY ("nik") REFERENCES "User"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sosial" ADD CONSTRAINT "Sosial_nik_fkey" FOREIGN KEY ("nik") REFERENCES "User"("nik") ON DELETE CASCADE ON UPDATE CASCADE;
