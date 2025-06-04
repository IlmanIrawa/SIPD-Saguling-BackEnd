const prisma = require("../db");

const insertSosial = async (sosialData) => {
    try {
        return await prisma.sosial.create({
            data: {
                nik: sosialData.nik,
                nama: sosialData.nama,
                alamat: sosialData.alamat,
                jenisBantuan: sosialData.jenisBantuan,
                usulSanggah: sosialData.usulSanggah || "LAYAK",
            }
        });
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError) {
            // Tangani error khusus, misalnya kode P2002 = duplikat unik
            if (error.code === 'P2002') {
                throw new Error('NIK sudah digunakan.');
            }
        }
        throw error;
    }
};

async function findSosials() {
    try {
        return await prisma.sosial.findMany();
    } catch (error) {
        throw new Error("Gagal mengambil data sosial: " + error.message);
    }
}

const findSosialById = async (sosialid) => {
    try {
        const id = parseInt(sosialid);
        if (isNaN(id)) throw new Error("ID tidak valid");

        const sosial = await prisma.sosial.findUnique({
            where: {
                sosialid: id,
            },
        });

        if (!sosial) {
            throw new Error("Data sosial tidak ditemukan");
        }

        return sosial;
    } catch (error) {
        throw new Error("Gagal mengambil data sosial: " + error.message);
    }
};

async function editSosial(sosialid, sosialData) {
    try {
        const id = parseInt(sosialid);
        if (isNaN(id)) throw new Error("ID tidak valid");

        const updatedSosial = await prisma.sosial.update({
            where: { sosialid: id },
            data: {
                nik: sosialData.nik,
                nama: sosialData.nama,
                alamat: sosialData.alamat,
                jenisBantuan: sosialData.jenisBantuan,
                usulSanggah: sosialData.usulSanggah || "LAYAK",
            },
        });
        return updatedSosial;
    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError) {
            // Tangani error khusus, misalnya kode P2002 = duplikat unik
            if (error.code === 'P2002') {
                throw new Error('NIK sudah digunakan.');
            }
        }
        throw error;
    }
}

async function deleteSosial(sosialid) {
    try {
        const id = parseInt(sosialid);
        if (isNaN(id)) throw new Error("ID tidak valid");

        const deletedSosial = await prisma.sosial.delete({
            where: { sosialid: id },
        });
        return deletedSosial;
    } catch (error) {
        throw new Error("Gagal menghapus data sosial: " + error.message);
    }
}

module.exports = {
    insertSosial,
    findSosials,
    findSosialById,
    editSosial,
    deleteSosial,
};
