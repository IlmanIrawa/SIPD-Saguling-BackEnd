const express = require("express");
const router = express.Router();
const pengajuanService = require("./pengajuan.service");
const authorizeJWT = require("../middleware/authorizeJWT");
const Pengajuan = require("../models/pengajuan.model");
const uploads = require("../middleware/upload.js")

// Route untuk membuat pengajuan
router.post(
  "/api/pengajuan",
  authorizeJWT,
  uploads.fields([
    { name: "ktp", maxCount: 1 },
    { name: "kk", maxCount: 1 },
    { name: "dokumenPenunjang", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { pengajuanid, nik, nama, alamat, noHp, keperluan, tanggalPengajuan, statusPengajuan } = req.body;

      const ktp = req.files["ktp"] ? req.files["ktp"][0].filename : null;
      const kk = req.files["kk"] ? req.files["kk"][0].filename : null;
      const dokumenPenunjang = req.files["dokumenPenunjang"] ? req.files["dokumenPenunjang"][0].filename : null;

      if (!pengajuanid || !nik || !nama || !alamat || !noHp || !keperluan) {
        return res.status(400).json({ message: "Semua field harus diisi" });
      }

      const pengajuan = new Pengajuan(
        pengajuanid,
        nik,
        nama,
        alamat,
        noHp,
        ktp,
        kk,
        dokumenPenunjang,
        keperluan,
        tanggalPengajuan,
        statusPengajuan
      );

      await pengajuan.save();

      return res.status(201).json({ message: "Pengajuan berhasil dibuat", data: pengajuan });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Route untuk mendapatkan semua pengajuan
router.get("/", authorizeJWT, async (req, res) => {
  try {
    const pengajuan = await pengajuanService.getAllPengajuan();
    res.status(200).json(pengajuan);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Route untuk mendapatkan pengajuan berdasarkan ID
router.get("/:pengajuanid", authorizeJWT, async (req, res) => {
  try {
    const pengajuanId = req.params.id;
    const pengajuan = await pengajuanService.getPengajuanById(pengajuanId);
    if (!pengajuan) {
      return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
    }
    res.status(200).json(pengajuan);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Route untuk mengupdate status pengajuan
router.patch("/:pengajuanid", authorizeJWT, async (req, res) => {
  try {
    const { pengajuanid } = req.params;
    const { statusPengajuan } = req.body;
    const updatePengajuan = await pengajuanService.updateStatusPengajuan(pengajuanid, statusPengajuan);
    res.status(200).json({
      message: "Status pengajuan berhasil diupdate",
      updatePengajuan});
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
