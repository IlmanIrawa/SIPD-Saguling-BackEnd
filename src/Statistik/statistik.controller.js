const express = require('express');
const router = express.Router();
const StatistikService = require('./statistik.service');
router.get('/', async (req, res) => {
    try {
        console.log("Menerima permintaan statistik...");

        // Mengambil data statistik
        const data = await StatistikService.getAllStatistik();

        console.log("Data Statistik:", data); // Log data statistik yang diambil

        // Mengirimkan data sebagai response
        res.json(data);
    } catch (error) {
        console.error("Terjadi kesalahan dalam mengambil data statistik:", error); // Log error

        res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
});

module.exports = router;
