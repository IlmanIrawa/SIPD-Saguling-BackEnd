const prisma = require('../db')

// Menambahkan laporan baru
const insertLaporan = async (laporData) => {
    try {
        return await prisma.lapor.create({
            data: {
                nama: laporData.nama,
                nohp: laporData.nohp,
                isiLaporan: laporData.isiLaporan,
                lampiran: laporData.lampiran,
                statusLapor: 'MENUNGGU'
            }
        })
    } catch (error) {
        console.error('Error saat menambahkan laporan:', error.message)
        throw new Error('Gagal menambahkan laporan')
    }
}

// Mendapatkan semua laporan
const findAllLapor = async () => {
    try {
        return await prisma.lapor.findMany();
    } catch (error) {
        throw new Error("Gagal mengambil data pengajuan");
    }
};

// Mencari laporan berdasarkan ID
const findLaporById = async (laporid) => {
    try {
        return await prisma.lapor.findUnique({
            where: {
                laporid: parseInt(laporid),
            },
        });
    } catch (error) {
        throw new Error("Laporan tidak ditemukan");
    }
};

// Memperbarui laporan berdasarkan ID
const updateLaporById = async (laporid, updateData) => {
    try {
        return await prisma.lapor.update({
            where: { laporid: parseInt(laporid) },
            data: {
                nama: updateData.nama,
                nohp: updateData.nohp,
                isiLaporan: updateData.isiLaporan,
                lampiran: updateData.lampiran,
                statusLapor: updateData.statusLapor
            }
        });
    } catch (error) {
        console.error("Error saat memperbarui laporan:", error.message);
        throw new Error("Gagal memperbarui laporan");
    }
};

module.exports = {
    insertLaporan,
    findLaporById,
    findAllLapor,
    updateLaporById
}
