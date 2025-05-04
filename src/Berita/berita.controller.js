const express = require("express");
const {
  createBerita, getAllBerita, getBeritaById,
  editBeritaById, deleteBeritaById,
} = require("./berita.service");
const authorizeJWT = require("../middleware/authorizeJWT");
const adminAuthorization = require("../middleware/adminAuthorization");
const berita = require("../models/berita.model");

const router = express.Router();

// Create Berita
router.post("/berita", authorizeJWT,  async (req, res) => {
  try {
    const newBeritaData = req.body;

    // Validasi input data
    if (!newBeritaData.tanggal || !newBeritaData.judul || !newBeritaData.isiBerita) {
      return res.status(400).json({ error: "Semua field (tanggal, judul, isiBerita) harus diisi." });
    }

    const newBerita = await createBerita(newBeritaData);
    res.status(201).json(newBerita);
  } catch (error) {
    // Menangani error spesifik jika terjadi masalah saat membuat berita
    console.error("Error saat membuat berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat membuat berita. Silakan coba lagi." });
  }
});

// Get All Beritas
router.get("/berita", authorizeJWT, async (req, res) => {
  try {
    const beritas = await getAllBerita();
    res.status(200).json(beritas);
  } catch (error) {
    // Menangani error jika terjadi masalah pada pengambilan semua berita
    console.error("Error saat mendapatkan semua berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil berita. Silakan coba lagi." });
  }
});

// Get Berita by ID
router.get("/:beritaid", authorizeJWT, async (req, res) => {
  try {
    const beritaId = parseInt(req.params.beritaid);
    if (isNaN(beritaId)) {
      return res.status(400).json({ error: "ID harus berupa angka" });
    }

    const beritaData = await getBeritaById(beritaId);
    if (!beritaData) {
      return res.status(404).json({ error: "Berita tidak ditemukan" });
    }

    res.status(200).json(beritaData);
  } catch (error) {
    console.error("Error saat mendapatkan berita berdasarkan ID:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mendapatkan berita. Silakan coba lagi." });
  }
});

// Update Berita
router.patch("/:beritaid", authorizeJWT,  async (req, res) => {
  try {
    const beritaId = parseInt(req.params.beritaid);
    if (isNaN(beritaId)) {
      return res.status(400).json({ error: "ID harus berupa angka" });
    }

    const beritaData = req.body;
    // Validasi input data sebelum update
    if (!beritaData.tanggal || !beritaData.judul || !beritaData.isiBerita) {
      return res.status(400).json({ error: "Semua field (tanggal, judul, isiBerita) harus diisi." });
    }

    const updatedBerita = await editBeritaById(beritaId, beritaData);
    if (!updatedBerita) {
      return res.status(404).json({ error: "Berita tidak ditemukan untuk diperbarui." });
    }

    res.status(200).json(updatedBerita);
  } catch (error) {
    console.error("Error saat mengupdate berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui berita. Silakan coba lagi." });
  }
});

// Delete Berita
router.delete("/:beritaid", authorizeJWT, adminAuthorization, async (req, res) => {
  try {
    const beritaId = parseInt(req.params.beritaid);
    if (isNaN(beritaId)) {
      return res.status(400).json({ error: "ID harus berupa angka" });
    }

    const beritaData = await deleteBeritaById(beritaId);
    if (!beritaData) {
      return res.status(404).json({ error: "Berita tidak ditemukan untuk dihapus" });
    }

    res.status(200).json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus berita:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus berita. Silakan coba lagi." });
  }
});

module.exports = router;
