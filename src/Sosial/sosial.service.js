const {
    insertSosial,
    findSosials,
    findSosialById,
    editSosial,
    deleteSosial,
} = require("./sosial.repository");
async function createSosial(newSosialData) {
    return await insertSosial(newSosialData);
}

async function getAllSosials() {
    return await findSosials();
}

async function getSosialById(sosialid) {
    return await findSosialById(sosialid); // pengecekan null sudah ditangani di repository
}

async function editSosialById(sosialid, sosialData) {
    await findSosialById(sosialid); // pastikan ada dulu
    return await editSosial(sosialid, sosialData);
}

async function deleteSosialById(sosialid) {
    await findSosialById(sosialid); // pastikan ada dulu
    return await deleteSosial(sosialid);
}

module.exports = {
    createSosial,
    getAllSosials,
    getSosialById,
    editSosialById,
    deleteSosialById,
};
