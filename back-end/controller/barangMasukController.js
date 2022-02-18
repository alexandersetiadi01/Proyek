const db = require("../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    const barang = await db.barangMasuk.create({
        //kodebarang: req.body.kodebarang, //belum pake
        namabarang: req.body.namabarang,
        //kodemasuk: req.body.kodemasuk, 
        kodePO: req.body.kodePO,
        namaPenerima: req.body.namaPenerima,
        quantity: req.body.quantity,  
        noSuratJalan: req.body.noSuratJalan,
        tgl: req.body.tgl
    });
    res.json(barang)
};

exports.seeAll = async (req, res) => {
    const barangMasuk = await db.barangMasuk.findAll();

    res.json(barangMasuk);
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
