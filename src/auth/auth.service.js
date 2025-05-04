const bcrypt = require('bcrypt');
const userRepository = require('./auth.repository');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = async (user) => {
    return jwt.sign({
        userId: user.userid,
        nik: user.nik, 
        nama: user.nama,
        jenisKelamin: user.jenisKelamin,
        tanggalLahir: user.tanggalLahir,          
        email: user.email,
        alamat: user.alamat,
        pendidikan: user.pendidikan,
        pekerjaan: user.pekerjaan,
        agama: user.agama,
        perkawinan: user.perkawinan,
        status: user.status,
        role: user.role,
        statusHidup: user.statusHidup  
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register user
const register = async (nik, nama, jenisKelamin, tanggalLahir, email, alamat, pendidikan, pekerjaan, agama, perkawinan, password) => {
    try {
        console.log("🔵 [REGISTER] Incoming Data:", { nik, nama, jenisKelamin, tanggalLahir, email });

        // Cek apakah NIK sudah terdaftar
        const existingUser = await userRepository.findUserByNik(nik);
        if (existingUser) {
            console.warn("⚠️ [REGISTER] NIK sudah terdaftar:", nik);
            throw new Error("NIK sudah terdaftar");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🟢 [REGISTER] Password hashed successfully");

        const user = {
            nik,
            nama,
            jenisKelamin,
            tanggalLahir: new Date(tanggalLahir),
            email,
            alamat,
            pendidikan,
            pekerjaan,
            agama,
            perkawinan,
            password: hashedPassword,
        };

        console.log("🔵 [REGISTER] User data before save:", user);

        const newUser = await userRepository.createUser(user);
        console.log("✅ [REGISTER] User created successfully:", newUser.nik);

        return newUser;
    } catch (error) {
        console.error("❌ [REGISTER] Error:", error.message);
        throw new Error(error.message);
    }
};

// Login user
const login = async (nik, password) => {
    try {
        console.log("🔵 [LOGIN] Incoming Data:", { nik });

        const user = await userRepository.findUserByNik(nik);
        if (!user) {
            console.warn("⚠️ [LOGIN] NIK tidak ditemukan:", nik);
            throw new Error("NIK tidak ditemukan");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.warn("⚠️ [LOGIN] Password salah untuk NIK:", nik);
            throw new Error("Password salah");
        }

        const token = await generateToken(user);
        console.log("✅ [LOGIN] Token generated successfully");

       // console.log("Generated token payload:", jwt.decode(token));

        return { user, token };
    } catch (error) {
        console.error("❌ [LOGIN] Error:", error.message);
        throw new Error(error.message);
    }
};

module.exports = { register, login };
