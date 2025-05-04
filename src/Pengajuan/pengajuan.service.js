const pengajuanRepository = require("./pengajuan.repository");

// Fungsi untuk membuat pengajuan baru
const createPengajuan = async (pengajuanid, nik, nama, alamat, noHp, ktp, kk, dokumenPenunjang) => {
  try {
    const newPengajuan = await pengajuanRepository.insertPengajuan(
      pengajuanid,
      nik,
      nama,
      alamat,
      noHp,
      ktp,
      kk,
      dokumenPenunjang
    );
    return newPengajuan;
  } catch (error) {
    throw new Error("Gagal membuat pengajuan: " + error.message);
  }
};

// Fungsi untuk mendapatkan semua pengajuan
const getAllPengajuan = async () => {
  try {
    const pengajuan = await pengajuanRepository.findAllPengajuan();
    return pengajuan;
  } catch (error) {
    throw new Error("Gagal mengambil data pengajuan: " + error.message);
  }
};

// Fungsi untuk mendapatkan pengajuan berdasarkan ID
const getPengajuanById = async (pengajuanId) => {
  try {
    const pengajuan = await pengajuanRepository.findPengajuanById(pengajuanId);
    if (!pengajuan) {
      throw new Error("Pengajuan tidak ditemukan");
    }
    return pengajuan;
  } catch (error) {
    throw new Error("Gagal mengambil pengajuan: " + error.message);
  }
};

// Fungsi untuk mengupdate status pengajuan
const updateStatusPengajuan = async (pengajuanId, statusPengajuan) => {
  try {
    const validStatus = ["PENDING","ON_PROCESS","MENUNGGU_TTD","SELESAI"];

    if (!validStatus.includes(statusPengajuan.toUpperCase())) {
      throw new Error("Status tidak valid");
    }

    const updatedPengajuan = await pengajuanRepository.updateStatusPengajuan(
      pengajuanId,
      statusPengajuan.toUpperCase(),
    );

    if (!updatedPengajuan) {
      throw new Error(`Pengajuan dengan ID ${pengajuanId} tidak ditemukan`);
    }

    return updatedPengajuan;
  } catch (error) {
    throw new Error("Gagal memperbarui status pengajuan: " + error.message);
  }
};

module.exports = {
  createPengajuan,
  getAllPengajuan,
  getPengajuanById,
  updateStatusPengajuan,
};
