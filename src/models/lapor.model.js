const laporList = [];

class lapor {
    constructor(nama, noHp, isiLaporan, lampiran) {
        this.id = laporList.length + 1;
        this.nama = nama;
        this.noHp = noHp;
        this.isiLaporan = isiLaporan,
        this.lampiran = lampiran
    }

    save() {
        laporList.push(this);
        return this;
    }

    static getAll() {
        return laporList;
    }
}

module.exports = lapor;
