// aset.service.js
const {
    insertAset,
    findAsets,
    findAsetById,
    editAset,
    deleteAset
} = require('./aset.repository');

async function createAset(newAsetData) {
    return await insertAset(newAsetData);
}

const getAllAsets = async () => {
    try {
        const aset = await findAsets(); // Memperbaiki pemanggilan fungsi
        return aset;
    } catch (error) {
        throw new Error("Gagal mengambil data Aset: " + error.message);
    }
};

async function getAsetById(asetid) {
    const aset = await findAsetById(asetid);
    if (!aset) {
        throw new Error('Aset tidak ditemukan');
    }
    return aset;
}

async function editAsetById(id, asetData) {
    await getAsetById(id); // Pastikan aset ada sebelum mengedit
    return await editAset(id, asetData);
}

async function deleteAsetById(id) {
    await getAsetById(id); // Pastikan aset ada sebelum menghapus
    await deleteAset(id);
}

module.exports = {
    createAset,
    getAllAsets,
    getAsetById,
    editAsetById,
    deleteAsetById
};