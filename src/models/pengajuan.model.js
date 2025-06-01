const pengajuanList = [];

class Pengajuan {
    constructor(nik, nama, alamat, noHp, ktp, kk, dok, keperluan, statusPengajuan) {
        this.id = pengajuanList.length + 1;
        this.nik = nik;
        this.nama = nama;
        this.alamat = alamat;
        this.noHp = noHp;
        this.ktp = ktp;
        this.kk = kk;
        this.dok = dok;
        this.keperluan = keperluan;
        this.statusPengajuan = statusPengajuan;
    }

    save() {
        pengajuanList.push(this);
        return this;
    }

    static getAll() {
        return pengajuanList;
    }
}

module.exports = Pengajuan;
