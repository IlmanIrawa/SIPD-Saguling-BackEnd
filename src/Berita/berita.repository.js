const prisma = require("../db");

async function insertBerita(beritaData) {
  return await prisma.berita.create({
    data: {
      judul: beritaData.judul,
      tanggal: userData.tanggal ? new Date(userData.tanggal) : new Date(),
      gambar: beritaData.gambar,
      isiBerita: beritaData.isiBerita,
    },
  });
}

async function findBeritas() {
  return await prisma.berita.findMany();
}

const findBeritaById = async (beritaid) => {
  try {
    const berita = await prisma.berita.findUnique({
      where: {
        beritaid: parseInt(beritaid),
      },
    });
    return berita;
  } catch (error) {
    throw new Error("Berita tidak ditemukan");
  }
};

async function editBerita(beritaid, beritaData) {
  return await prisma.berita.update({
    where: { beritaid: parseInt(beritaid) }, // Perbaikan: Pastikan primary key sesuai skema
    data: {
      judul: beritaData.judul,
      tanggal: userData.tanggal ? new Date(userData.tanggal) : new Date(),
      gambar: beritaData.gambar,
      isiBerita: beritaData.isiBerita,
    },
  });
}

async function deleteBerita(beritaid) {
  return await prisma.berita.delete({
    where: { beritaid: parseInt(beritaid) }, // Perbaikan: Gunakan id
  });
}

module.exports = {
  insertBerita,
  findBeritas,
  findBeritaById,
  editBerita,
  deleteBerita,
};
