const prisma = require('../db');

// Fungsi untuk membuat pengajuan baru
const createPengajuan = async (nik, nama, alamat, noHp, ktp, kk, lampiran, keperluan, catatan) => {
  try {
    const newPengajuan = await prisma.pengajuan.create({
      data: {
        nik,
        nama,
        alamat,
        noHp,
        ktp,
        kk,
        lampiran,
        keperluan,
        statusPengajuan: 'PENDING',
        catatan,
      },
    });
    return newPengajuan;
  } catch (error) {
    throw new Error("Gagal membuat pengajuan: " + error.message);
  }
};

// Fungsi untuk mendapatkan semua pengajuan
const getAllPengajuan = async () => {
  try {
    const pengajuan = await prisma.pengajuan.findMany();
    return pengajuan;
  } catch (error) {
    throw new Error("Gagal mengambil data pengajuan: " + error.message);
  }
};

// Fungsi untuk mendapatkan pengajuan berdasarkan ID
const findPengajuanById = async (pengajuanid) => {
  try {
    const id = parseInt(pengajuanid, 10); // pastikan pengajuanid bertipe Int
    const pengajuan = await prisma.pengajuan.findUnique({
      where: { pengajuanid: id },
    });
    return pengajuan;
  } catch (error) {
    throw new Error("Gagal mengambil pengajuan: " + error.message);
  }
};

// Fungsi untuk mengupdate status dan catatan pengajuan
const updateStatusPengajuan = async (pengajuanid, statusPengajuan, catatan) => {
  try {
    const id = parseInt(pengajuanid, 10); // pastikan pengajuanid bertipe Int
    const updatedPengajuan = await prisma.pengajuan.update({
      where: { pengajuanid: id },
      data: {
        statusPengajuan,
        catatan: catatan ?? "", // default jadi string kosong jika null/undefined
      },
    });
    return updatedPengajuan;
  } catch (error) {
    throw new Error("Gagal memperbarui status pengajuan: " + error.message);
  }
};

module.exports = {
  createPengajuan,
  getAllPengajuan,
  findPengajuanById,
  updateStatusPengajuan,
};
