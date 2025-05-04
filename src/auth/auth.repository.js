const prisma = require('../db');

const createUser = async (userData) => {
    try {
        console.log("🔵 [DB] Creating user:", userData.nik);

        const newUser = await prisma.user.create({ data: userData });

        console.log("✅ [DB] User created successfully:", newUser.nik);
        return newUser;
    } catch (error) {
        console.error("❌ [DB] Error creating user:", error.message);
        throw new Error(error.message);
    }
};

const findUserByNik = async (nik) => {
    try {
        console.log("🔵 [DB] Checking if NIK exists:", nik);

        const user = await prisma.user.findUnique({ where: { nik } });

        if (user) {
            console.log("✅ [DB] NIK ditemukan:", nik);
        } else {
            console.log("⚠️ [DB] NIK tidak ditemukan:", nik);
        }

        return user;
    } catch (error) {
        console.error("❌ [DB] Error checking NIK:", error.message);
        throw new Error("Login Failed");
    }
};

module.exports = {
    createUser,
    findUserByNik
};
