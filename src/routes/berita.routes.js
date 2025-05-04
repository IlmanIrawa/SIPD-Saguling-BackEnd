const express = require("express");
const prisma = require("../db"); // Pastikan Prisma Client sudah dikonfigurasi
const router = express.Router();
const upload = require("../middleware/upload");

// Route untuk membuat berita
router.post(
  "/berita",
  upload.fields([{ name: "gambar", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { judul, tanggal, isiBerita } = req.body;
      const gambar = req.files?.gambar?.[0]?.filename || null; 

      // Validasi input
      if (!judul || !tanggal || !isiBerita) {
        return res.status(400).json({ message: "Semua field harus diisi" });
      }

      // Simpan ke database dengan Prisma
      const berita = await prisma.berita.create({
        data: {
          judul,
          tanggal: new Date(tanggal), // Pastikan format tanggal benar
          gambar,
          isiBerita,
        },
      });

      return res.status(201).json({ message: "Berita berhasil dibuat", data: berita });
    } catch (error) {
      console.error("❌ Error saat menyimpan ke database:", error);
      res.status(500).json({ message: "Gagal menyimpan data", error: error.message });
    }
  }
);

// Route untuk mendapatkan semua berita
router.get("/berita", async (req, res) => {
  try {
    const berita = await prisma.berita.findMany(); // Mengambil semua data berita
    res.status(200).json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
