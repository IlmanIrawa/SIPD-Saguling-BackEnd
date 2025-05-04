const express = require('express')
const router = express.Router()
const authorizeJWT = require("../middleware/authorizeJWT");
const laporService = require('./lapor.service')

const upload = require('../middleware/upload');

router.post('/', upload.single('lampiran'), async (req, res) => {
    try {
        const laporanBaru = {
            nama: req.body.nama,
            nohp: req.body.nohp,
            isiLaporan: req.body.isiLaporan,
            lampiran: req.file ? req.file.filename : null // ambil nama file dari multer
        }

        const laporan = await laporService.createLaporan(laporanBaru)
        res.status(201).json({
            message: "Laporan berhasil ditambahkan",
            data: laporan
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

// Endpoint GET: Menampilkan semua laporan
router.get("/", authorizeJWT, async (req, res) => {
    try {
        const Lapor = await laporService.getAllLapor();
        res.status(200).json(Lapor);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Endpoint GET: Mendapatkan laporan berdasarkan ID
router.get("/:laporid", authorizeJWT, async (req, res) => {
    try {
        const laporid = req.params.laporid;
        const Lapor = await laporService.getLaporById(laporid);
        if (!Lapor) {
            return res.status(404).json({ message: "Laporan tidak ditemukan" });
        }
        res.status(200).json(Lapor);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Endpoint PUT: Mengedit laporan berdasarkan ID
router.put("/:laporid", authorizeJWT, async (req, res) => {
    try {
        const laporid = req.params.laporid;
        const updateData = req.body;
        const updatedLapor = await laporService.updateLapor(laporid, updateData);
        res.status(200).json({
            message: "Laporan berhasil diperbarui",
            data: updatedLapor
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
