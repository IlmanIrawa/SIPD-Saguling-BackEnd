// aset.controller.js
const express = require('express');
const {
    createAset,
    getAllAsets,
    getAsetById,
    editAsetById,
    deleteAsetById
} = require('./aset.service');
const authorizeJWT = require('../middleware/authorizeJWT');
const adminAuthorization = require('../middleware/adminAuthorization');

const router = express.Router();

// Create Aset
router.post('/', authorizeJWT, async (req, res) => {
    try {
        const newAsetData = req.body;
        const newAset = await createAset(newAsetData);
        res.status(201).json(newAset);
    } catch (error) {
        console.error('Error in createAset:', error);
        res.status(400).json({ error: error.message });
    }
});

// Get All Asets
router.get('/', authorizeJWT, async (req, res) => {
    try {
        const asets = await getAllAsets();
        res.status(200).json(asets);
    } catch (error) {
        console.error('Error in getAllAsets:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get Aset by ID
router.get('/:asetid', authorizeJWT, async (req, res) => {
    try {
        const asetId = parseInt(req.params.asetid);
        if (isNaN(asetId)) {
            return res.status(400).json({ error: 'ID harus berupa angka' });
        }

        const aset = await getAsetById(asetId);
        if (!aset) {
            return res.status(404).json({ error: 'Aset tidak ditemukan' });
        }

        res.status(200).json(aset);
    } catch (error) {
        console.error('Error in getAsetById:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update Aset
router.patch('/:asetid', authorizeJWT, adminAuthorization, async (req, res) => {
    try {
        const asetId = parseInt(req.params.asetid);
        if (isNaN(asetId)) {
            return res.status(400).json({ error: 'ID harus berupa angka' });
        }

        const asetData = req.body;
        const updatedAset = await editAsetById(asetId, asetData);
        res.status(200).json(updatedAset);
    } catch (error) {
        console.error('Error in editAsetById:', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete Aset
router.delete('/:asetid', authorizeJWT, adminAuthorization, async (req, res) => {
    try {
        const asetId = parseInt(req.params.asetid);
        if (isNaN(asetId)) {
            return res.status(400).json({ error: 'ID harus berupa angka' });
        }

        await deleteAsetById(asetId);
        res.status(200).json({ message: 'Aset berhasil dihapus' });
    } catch (error) {
        console.error('Error in deleteAsetById:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;