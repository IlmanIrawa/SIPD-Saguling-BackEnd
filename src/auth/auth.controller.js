const express = require('express');
const router = express.Router();
const authService = require('./auth.service');

router.post('/register', async (req, res) => {
    const {
        nik,
        nama,
        jenisKelamin,
        tanggalLahir,
        email,
        alamat,
        pendidikan,
        pekerjaan,
        agama,
        perkawinan,
        password
    } = req.body;

    try {
        console.log("🔵 [REGISTER REQUEST] Received data:", req.body);

        if (!nik || !nama || !jenisKelamin || !tanggalLahir || !email || !alamat || 
            !pendidikan || !pekerjaan || !agama || !perkawinan || !password) {
            console.warn("⚠️ [REGISTER] Missing required fields");
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = await authService.register(
            nik, nama, jenisKelamin, tanggalLahir, email, alamat, pendidikan, pekerjaan, agama, perkawinan, password
        );

        console.log("✅ [REGISTER] Success:", newUser.nik);
        res.status(201).json({
            data: {
                nik: newUser.nik,
                nama: newUser.nama,
                jenisKelamin: newUser.jenisKelamin,
                tanggalLahir: newUser.tanggalLahir,
                email: newUser.email,
                alamat: newUser.alamat,
                pendidikan: newUser.pendidikan,
                pekerjaan: newUser.pekerjaan,
                agama: newUser.agama,
                perkawinan: newUser.perkawinan,
                role: newUser.role,
            },
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("❌ [REGISTER] Failed:", error.message);
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { nik, password } = req.body;

    try {
        console.log("🔵 [LOGIN REQUEST] Received data:", req.body);

        if (!nik || !password) {
            console.warn("⚠️ [LOGIN] Missing required fields");
            return res.status(400).json({ error: "NIK and Password are required" });
        }

        const { user, token } = await authService.login(nik, password);
        console.log("✅ [LOGIN] Success:", user.nik, user.userid);

        res.status(200).json({
            data: {
                userid:user.userid,
                nik: user.nik,
                nama: user.nama,
                role: user.role,
                token: token
            },
            message: "Login successful"
        });

    } catch (error) {
        console.error("❌ [LOGIN] Failed:", error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
