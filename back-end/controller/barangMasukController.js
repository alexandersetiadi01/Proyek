const db = require("../models");
const Op = db.Sequelize.Op;

exports.createBarangMasuk = async (req, res) => {
    const barang = await db.barangMasuk.create({
        namabarang: req.body.namabarang,
        kodePO: req.body.kodePO,
        namaPenerima: req.body.namaPenerima,
        quantity: req.body.quantity,  
        noSuratJalan: req.body.noSuratJalan,
        tgl: req.body.tgl,
        status: "masuk",
        lokasi: req.body.lokasi
    });
    res.json(barang)
};

exports.createBarangSisa = async (req, res) => {
    const barang = await db.barangMasuk.create({
        namabarang: req.body.namabarang,
        kodePO: req.body.kodePO,
        namaPenerima: req.body.namaPenerima,
        quantity: req.body.quantity,  
        noSuratJalan: req.body.noSuratJalan,
        tgl: req.body.tgl,
        status: "sisa",
        lokasi: req.body.lokasi
    });
    res.json(barang)
};

exports.seeAllBarangMasuk = async (req, res) => {
    const barangMasuk = await db.barangMasuk.findAll(
        {
            where: {
                status: "masuk"
            }
        }
    );

    res.json(barangMasuk);
}

exports.seeAllBarangSisa = async (req, res) => {
    const barangSisa = await db.barangMasuk.findAll(
        {
            where: {
                status: "sisa"
            }
        }
    );

    res.json(barangSisa);
}


exports.seeAllBarang = async (req, res) => {
    const barangSisa = await db.barangMasuk.findAll();

    res.json(barangSisa);
}

exports.searchByName = async (req, res) => {

    const barangMasuk = await db.barangMasuk.findAll({
        where:{
            namabarang: {
                $in: req.body.namabarang
            }
    }});

    res.json(barangMasuk);
    console.log(res.json(barangMasuk));
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};
