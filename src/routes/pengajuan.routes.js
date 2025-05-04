const express = require("express");
const prisma = require("../db"); // Pastikan ini adalah Prisma Client
const router = express.Router();
const upload = require("../middleware/upload");

// Route untuk membuat pengajuan
router.post(
  "/pengajuan",
  upload.fields([{ name: "ktp", maxCount: 1 }, { name: "kk", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { nik, nama, alamat, noHp, keperluan } = req.body;
      const ktp = req.files["ktp"] ? req.files["ktp"][0].filename : null;
      const kk = req.files["kk"] ? req.files["kk"][0].filename : null;

      if (!nik || !nama || !alamat || !noHp || !keperluan) {
        return res.status(400).json({ message: "Semua field harus diisi" });
      }
      const nikInt = parseInt(nik, 10);
      // Gunakan Prisma untuk menyimpan data ke database
      const pengajuan = await prisma.pengajuan.create({
        data: {
          nik: nikInt,
          nama,
          alamat,
          noHp,
          ktp,
          kk,
          keperluan,
          statusPengajuan: "ON_PROCESS", // Default status
        },
      });

      return res.status(201).json({ message: "Pengajuan berhasil dibuat", data: pengajuan });
    } catch (error) {
      console.error("❌ Error saat menyimpan ke database:", error);
      res.status(500).json({ message: "Gagal menyimpan data", error: error.message });
    }
  }
);

// Route untuk mendapatkan semua pengajuan
router.get("/pengajuan", async (req, res) => {
  try {
    const pengajuan = await prisma.pengajuan.findMany(); // Mengambil semua data dengan Prisma
    res.status(200).json(pengajuan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
