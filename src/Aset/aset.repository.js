// aset.repository.js
const prisma = require('../db');

async function insertAset(asetData) {
    return await prisma.aset.create({
        data: {
            nama: asetData.nama,
            tanggalBeli: asetData.tanggalBeli ? new Date(asetData.tanggalBeli) : new Date(),
            harga: asetData.harga,
            statusAset: 'ADA',
            keterangan: asetData.keterangan
        }
    });
}

async function findAsets() {
    return await prisma.aset.findMany();
}

async function findAsetById(asetid) {
    return await prisma.aset.findUnique({
        where: { asetid: parseInt(asetid) }
    });
}

async function editAset(asetid, asetData) {
    return await prisma.aset.update({
        where: { asetid: parseInt(asetid) },
        data: {
            nama: asetData.nama,
            tanggalBeli: asetData.tanggalBeli ? new Date(asetData.tanggalBeli) : undefined,
            harga: asetData.harga,
            statusAset: asetData.statusAset,
            keterangan: asetData.keterangan
        }
    });
}

async function deleteAset(asetid) {
    await prisma.aset.delete({
        where: { asetid: parseInt(asetid) }
    });
}

module.exports = {
    insertAset,
    findAsets,
    findAsetById,
    editAset,
    deleteAset
};
