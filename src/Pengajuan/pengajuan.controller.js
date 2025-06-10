const express = require("express");
const router = express.Router();
const pengajuanService = require("./pengajuan.service");
const authorizeJWT = require("../middleware/authorizeJWT");
const upload = require("../middleware/upload");

// Route untuk membuat pengajuan
router.post(
  "/api/pengajuan",
  authorizeJWT,(req, res, next) => {
    console.log("Content-Type:", req.headers['content-type']);
    next();
  },
  upload.fields([
    { name: 'ktp', maxCount: 1 },
    { name: 'kk', maxCount: 1 },
    { name: 'lampiran', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log("FILES:", req.files);
      console.log("BODY:", req.body);

      const {
        nik,
        nama,
        alamat,
        noHp,
        keperluan,
      } = req.body;

      const ktp = req.files?.ktp?.[0]?.filename || null;
      const kk = req.files?.kk?.[0]?.filename || null;
      const lampiran = req.files?.lampiran?.[0]?.filename || null;

      if (!nik || !nama || !alamat || !noHp || !keperluan) {
        return res.status(400).json({ message: "Semua field harus diisi" });
      }

      const pengajuan = await pengajuanService.createPengajuan(
        nik,
        nama,
        alamat,
        noHp,
        ktp,
        kk,
        lampiran,
        keperluan
      );

      return res.status(201).json({ message: "Pengajuan Berhasil", data: pengajuan });

    } catch (error) {
      console.error("Gagal mengirim pengajuan:", error.message);
      return res.status(500).json({ message: "Gagal mengirim pengajuan", error: error.message });
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

// Route untuk mendapatkan pengajuan berdasarkan NIK
router.get("/by-nik", authorizeJWT, async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const nik = req.user.nik;
    const role = req.user.role;

    console.log("nik dari req.user:", nik);
    console.log("role dari req.user:", role);

    // Validasi tambahan: Pastikan NIK di token sesuai dengan NIK di data pengajuan
    const data = await pengajuanService.getPengajuanByNIK(nik);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Pengajuan tidak ditemukan untuk NIK tersebut" });
    }

    // Validasi: Periksa apakah NIK di setiap data pengajuan sesuai dengan NIK pengguna
    const isValid = data.every(pengajuan => pengajuan.nik === nik);

    if (!isValid) {
      console.warn("Potensi upaya akses ilegal: NIK tidak sesuai dengan data pengajuan.");
      return res.status(403).json({ message: "Akses ditolak: Anda tidak memiliki izin untuk melihat data ini." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Gagal mendapatkan pengajuan berdasarkan NIK:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data", error: error.message });
  }
});


// Route untuk mendapatkan pengajuan berdasarkan ID
router.get("/:pengajuanid", authorizeJWT, async (req, res) => {
  try {
    const pengajuanId = req.params.pengajuanid;
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
    const { catatan } = req.body;
    const updatePengajuan = await pengajuanService.updateStatusPengajuan(
      pengajuanid,
      statusPengajuan,
      catatan
    );
    res.status(200).json({
      message: "Status pengajuan berhasil diupdate",
      updatePengajuan,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
