const prisma = require("../db");  // Pastikan prisma sudah diimport dengan benar

const StatistikRepository = {
  getPekerjaan: async () => {
    try {
      const rows = await prisma.user.groupBy({
        by: ['pekerjaan'],
        _count: {
          pekerjaan: true,
        },
      });
      console.log("Data Pekerjaan:", rows);  // Log untuk debug
      return rows;
    } catch (error) {
      console.error("Error mengambil pekerjaan:", error);
      throw new Error("Gagal mengambil data pekerjaan");
    }
  },

  getAgama: async () => {
    try {
      const rows = await prisma.user.groupBy({
        by: ['agama'],
        _count: {
          agama: true,
        },
      });
      console.log("Data Agama:", rows);  // Log untuk debug
      return rows;
    } catch (error) {
      console.error("Error mengambil agama:", error);
      throw new Error("Gagal mengambil data agama");
    }
  },

  getPendidikan: async () => {
    try {
      const rows = await prisma.user.groupBy({
        by: ['pendidikan'],
        _count: {
          pendidikan: true,
        },
      });
      console.log("Data Pendidikan:", rows);  // Log untuk debug
      return rows;
    } catch (error) {
      console.error("Error mengambil pendidikan:", error);
      throw new Error("Gagal mengambil data pendidikan");
    }
  },

  getPerkawinan: async () => {
    try {
      const rows = await prisma.user.groupBy({
        by: ['perkawinan'],
        _count: {
          perkawinan: true,
        },
      });
      console.log("Data Perkawinan:", rows);  // Log untuk debug
      return rows;
    } catch (error) {
      console.error("Error mengambil perkawinan:", error);
      throw new Error("Gagal mengambil data perkawinan");
    }
  },
};

module.exports = StatistikRepository;
