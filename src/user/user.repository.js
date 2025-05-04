const prisma = require('../db')

const createUser = async (userData) => {
    const newUser = await prisma.user.create({
        data: {
            nik: userData.nik, 
            nama: userData.nama,
            jenisKelamin: userData.jenisKelamin, 
            tanggalLahir: userData.tanggalLahir ? new Date(userData.tanggalLahir) : new Date(), 
            email: userData.email,
            alamat: userData.alamat,
            pendidikan: userData.pendidikan,
            pekerjaan: userData.pekerjaan,
            agama: userData.agama,
            perkawinan: userData.perkawinan,
            statusHidup: userData.statusHidup || 'HIDUP', 
            role: userData.role || 'USER', 
            password: userData.password 
        }
    })
    return newUser
}

const getAllUser = async () => {
    const allUser = await prisma.user.findMany({
        select: {
            userid: true,
            nik: true,
            nama: true,
            email: true,
            jenisKelamin: true,
            tanggalLahir: true,
            alamat: true,
            pendidikan: true,
            pekerjaan: true,
            agama: true,
            perkawinan: true,
            statusHidup: true,
            role: true
        }
    })
    return allUser
}

const getUserById = async (userid) => {
    const user = await prisma.user.findUnique({
        where: {
            userid: parseInt(userid,10)
        },
        select: {
            userid: true,
            nik: true,
            nama: true,
            email: true,
            jenisKelamin: true,
            tanggalLahir: true, 
            alamat: true,
            pendidikan: true,
            pekerjaan: true,
            agama: true,
            perkawinan: true,
            statusHidup: true,
            role: true
        }
    })

    // Lakukan transformasi tanggalLahir jika diperlukan
    if (user && user.tanggalLahir) {
        user.tanggalLahir = new Date(user.tanggalLahir)
    }
    return user
}


const editUser = async (userid, userData) => {
    const user = await prisma.user.update({
        where: {
            userid: parseInt(userid)
        },
        data: {
            nik: userData.nik,
            nama: userData.nama,
            jenisKelamin: userData.jenisKelamin,
            tanggalLahir: userData.tanggalLahir ? new Date(userData.tanggalLahir) : new Date(), 
            email: userData.email,
            alamat: userData.alamat,
            pendidikan: userData.pendidikan,
            pekerjaan: userData.pekerjaan,
            agama: userData.agama,
            perkawinan: userData.perkawinan,
            statusHidup: userData.statusHidup,
            role: userData.role
        }
    })
    return user
}

const deleteUser = async (userid) => {
    const user = await prisma.user.delete({
        where: {
            userid: parseInt(userid)
        }
    })
    return user
}

const findUserById = async (userid) => {
    return await prisma.user.findUnique({
        where: { userid },
        select: {
            userid: true,
            nik: true,
            nama: true,
            email: true,
            jenisKelamin: true,
            tanggalLahir: true,
            alamat: true,
            pendidikan: true,
            pekerjaan: true,
            agama: true,
            perkawinan: true,
            statusHidup: true,
            role: true
        }
    });
}


module.exports = {
    createUser,
    getAllUser,
    getUserById,
    editUser,
    deleteUser,
    findUserById
}
