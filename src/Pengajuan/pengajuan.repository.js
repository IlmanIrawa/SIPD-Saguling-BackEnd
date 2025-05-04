const prisma = require("../db");

// Menambahkan pengajuan baru
const insertPengajuan = async (
  pengajuanid,
  nik,
  nama,
  alamat,
  noHp,
  ktp,
  kk,
  dokumenPenunjang,
  tanggalPengajuan
) => {
  try {
    if (!pengajuanid || !nik || !nama || !alamat || !noHp || !ktp || !kk || !dokumenPenunjang) {
      throw new Error("Semua field wajib diisi");
    }

    const newPengajuan = await prisma.pengajuan.create({
      data: {
        pengajuanid,
        nik,
        nama,
        alamat,
        noHp,
        ktp,
        kk,
        dokumenPenunjang,
        tanggalPengajuan: tanggalPengajuan ? new Date(tanggalPengajuan) : new Date(),
        statusPengajuan: "PENDING",
      },
    });
    return newPengajuan;
  } catch (error) {
    console.error("Gagal membuat pengajuan:", error);
    throw new Error("Gagal membuat pengajuan");
  }
};

// Mendapatkan semua pengajuan
const findAllPengajuan = async () => {
  try {
    return await prisma.pengajuan.findMany();
  } catch (error) {
    console.error("Gagal mengambil data pengajuan:", error);
    throw new Error("Gagal mengambil data pengajuan");
  }
};

// Mencari pengajuan berdasarkan pengajuanid
const findPengajuanById = async (pengajuanId) => {
  try {
    const pengajuan = await prisma.pengajuan.findUnique({
      where: { pengajuanid: Number(pengajuanId) },
    });
    if (!pengajuan) throw new Error("Pengajuan tidak ditemukan");
    return pengajuan;
  } catch (error) {
    console.error("Kesalahan saat mencari pengajuan:", error);
    throw new Error("Pengajuan tidak ditemukan");
  }
};

// Mengupdate status pengajuan
const updateStatusPengajuan = async (pengajuanId, statusPengajuan, timeStampField) => {
  try {
    const updateData = { statusPengajuan };

    if (timeStampField) {
      updateData[timeStampField] = new Date();
    }

    const update = await prisma.pengajuan.update({
      where: { pengajuanid: Number(pengajuanId) },
      data: updateData,
    });

    return update;
  } catch (error) {
    console.error("Gagal memperbarui status pengajuan:", error);
    throw new Error("Gagal memperbarui status pengajuan");
  }
};

module.exports = {
  insertPengajuan,
  findAllPengajuan,
  findPengajuanById,
  updateStatusPengajuan,
};