const laporRepository = require('./lapor.repository')

// Menambahkan laporan baru
const createLaporan = async (laporData) => {
    if (!laporData.nama || !laporData.isiLaporan) {
        throw new Error('Nama dan isi laporan harus diisi')
    }
    try {
        return await laporRepository.insertLaporan(laporData)
    } catch (error) {
        console.error('Error di service saat menambahkan laporan:', error.message)
        throw new Error('Gagal menambahkan laporan')
    }
}

// Mengambil semua laporan
const getAllLapor = async () => {
    try {
        return await laporRepository.findAllLapor();
    } catch (error) {
        throw new Error("Gagal mengambil data pengajuan: " + error.message);
    }
};

// Mendapatkan laporan berdasarkan ID
const getLaporById = async (laporid) => {
    try {
        const Lapor = await laporRepository.findLaporById(laporid);
        if (!Lapor) {
            throw new Error("Laporan tidak ditemukan");
        }
        return Lapor;
    } catch (error) {
        throw new Error("Gagal mengambil laporan: " + error.message);
    }
};

// Memperbarui laporan
const updateLapor = async (laporid, updateData) => {
    try {
        return await laporRepository.updateLaporById(laporid, updateData);
    } catch (error) {
        throw new Error("Gagal memperbarui laporan: " + error.message);
    }
};

module.exports = {
    createLaporan,
    getAllLapor,
    getLaporById,
    updateLapor
};
