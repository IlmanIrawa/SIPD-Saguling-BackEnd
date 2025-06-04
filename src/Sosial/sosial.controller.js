// sosial.controller.js
const express = require('express');
const {
    createSosial,
    getAllSosials,
    getSosialById,
    editSosialById,
    deleteSosialById
} = require('./sosial.service');
const authorizeJWT = require('../middleware/authorizeJWT');
const adminAuthorization = require('../middleware/adminAuthorization');
const router = express.Router();

// Create Sosial
router.post('/', authorizeJWT, async (req, res) => {
    try {
        const newSosialData = req.body;
        const newSosial = await createSosial(newSosialData);
        res.status(201).json(newSosial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Sosials
router.get('/', async (req, res) => {
    try {
        const { nik } = req.query;
        let sosials = await getAllSosials();

        if (nik) {
            sosials = sosials.filter(item => item.nik.toString() === nik.toString());
        }
        res.status(200).send(sosials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET Sosial by ID
router.get('/:sosialid', authorizeJWT, async (req, res) => {
    const sosialid = parseInt(req.params.sosialid);

    if (isNaN(sosialid)) {
        return res.status(400).json({ message: 'ID tidak valid' });
    }

    try {
        const sosial = await getSosialById(sosialid);
        res.status(200).send(sosial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT Sosial
router.put('/:sosialid', authorizeJWT, async (req, res) => {
    const sosialId = parseInt(req.params.sosialid);

    if (isNaN(sosialId)) {
        return res.status(400).json({ message: 'ID tidak valid' });
    }

    try {
        const sosialData = req.body;
        const updatedSosial = await editSosialById(sosialId, sosialData);
        res.send(updatedSosial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE Sosial
router.delete('/:sosialid', authorizeJWT, async (req, res) => {
    const sosialId = parseInt(req.params.sosialid);

    if (isNaN(sosialId)) {
        return res.status(400).json({ message: 'ID tidak valid' });
    }

    try {
        await deleteSosialById(sosialId);
        res.status(204).json({ message: 'Data Sosial berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
