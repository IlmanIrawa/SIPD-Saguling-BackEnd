const StatistikRepository = require('./statistik.repository');

const StatistikService = {
    getAllStatistik: async () => {
        try {
            const pekerjaan = await StatistikRepository.getPekerjaan();
            const agama = await StatistikRepository.getAgama();
            const pendidikan = await StatistikRepository.getPendidikan();
            const perkawinan = await StatistikRepository.getPerkawinan();

            console.log("Pekerjaan:", pekerjaan);
            console.log("Agama:", agama);
            console.log("Pendidikan:", pendidikan);
            console.log("Perkawinan:", perkawinan);

            return {
                pekerjaan,
                agama,
                pendidikan,
                perkawinan
            };
        } catch (error) {
            console.error("Error dalam mengambil statistik:", error);
            throw error;
        }
    }
};


module.exports = StatistikService;
