const bcrypt = require('bcrypt');
const userRepository = require('./user.repository');

const createUser = async (newUserData) => {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
    return await userRepository.createUser(newUserData);
};

const getAllUser = async () => {
    return await userRepository.getAllUser();
};

const getUserById = async (userid) => {
    const userId = parseInt(userid, 10); 
    if (isNaN(userId)) {
        throw new Error("Invalid user ID");
    }
    console.log('User ID:', userId);

    const user = await userRepository.getUserById(userId);
    
    console.log('User ditemukan:', user);

    if (!user) {
        throw new Error("User Not Found");
    }
    return user;
};

const editUser = async (userid, userData) => {
    const userId = parseInt(userid, 10); // Pastikan userid diparsing menjadi integer

    // Cek apakah ada data yang akan diperbarui
    if (Object.keys(userData).length === 0) {
        throw new Error("No update data provided");
    }

    // Hash password jika ada perubahan
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Pastikan user ada sebelum update
    await getUserById(userid);
    return await userRepository.editUser(userId, userData);
};

const deleteUser = async (userid) => {
    const id = parseInt(userid, 10); // Pastikan userid diparsing menjadi integer
    await getUserById(id); // Pastikan user ada sebelum dihapus
    return await userRepository.deleteUser(id);
};

const getMe = async (userid) => {
    const userId = parseInt(userid, 10); // Pastikan userid diparsing menjadi integer
    const user = await userRepository.findUserById(userId);
    if (!user) throw new Error("User not found");
    return user;
};

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    editUser,
    deleteUser,
    getMe
};
