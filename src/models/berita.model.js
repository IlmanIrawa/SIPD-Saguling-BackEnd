const beritaList = [];

class berita {
    constructor(judul, tanggal, gambar, isiBerita) {
        this.id = pengajuanList.length + 1;
        this.judul = judul;
        this.tanggal = tanggal;
        this.gambar = gambar,
        this.isiBerita = isiBerita
    }

    save() {
        beritaList.push(this);
        return this;
    }

    static getAll() {
        return beritaList;
    }
}

module.exports = berita;
