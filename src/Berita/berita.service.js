const {
  insertBerita,
  findBeritas,
  findBeritaById,
  editBerita,
  deleteBerita,
} = require("./berita.repository");


// Fungsi untuk membuat pengajuan baru
const createBerita = async (judul, tanggal, gambar, isi) => {
  try {
    const newBerita = await beritaRepository.insertBerita(
      judul,
      tanggal,
      gambar,
      isi
    );
    return newBerita;
  } catch (error) {
    throw new Error("Gagal membuat Berita: " + error.message);
  }
};

// Fungsi untuk mendapatkan semua pengajuan
const getAllBerita = async () => {
  try {
    const berita = await beritaRepository.findAllBerita();
    return berita;
  } catch (error) {
    throw new Error("Gagal mengambil data Berita: " + error.message);
  }
};

async function getBeritaById(beritaid) {
  const berita = await findBeritaById(beritaid);
  if (!berita) {
    throw new Error("Berita tidak ditemukan");
  }
  return berita;
}

async function editBeritaById(beritaid, beritaData) {
  await getBeritaById(beritaid); // Pastikan berita ada sebelum update
  return await editBerita(beritaid, beritaData);
}

async function deleteBeritaById(beritaid) {
  await getBeritaById(beritaid); // Pastikan berita ada sebelum delete
  return await deleteBerita(beritaid);
}

module.exports = {
  createBerita,
  getAllBerita,
  getBeritaById,
  editBeritaById,
  deleteBeritaById,
};
