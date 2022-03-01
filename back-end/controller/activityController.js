const { barangMasuk, barangKeluar, activity} = require("../models");
const { QueryTypes } = require('sequelize');
const db = require("../models");
const Op = db.Sequelize.Op;

exports.seeActvity = async (req, res) => {
    const activities = await activity.findAll();

    res.json(activities)
};

exports.addActivity = async (req, res) => {
    const barang = await db.barangMasuk.create({
        kode: req.body.kode,
        namabarang: req.body.namabarang,
        namaOrang: req.body.namaOrang,
        quantity: req.body.quantity,
        progress: req.body.progress,
        namaOrang: req.body.namaOrang,
        status: req.body.status,
        noSuratJalan: req.body.noSuratJalan,
        tgl: req.body.tgl,
        tglUpdate: req.body.tglUpdate

        
    });
    res.json(barang)
};

/*
exports.seeHistory = async (req, res) => {
    const history = await sequelize.query(
        'SELECT * FROM barangmasuk, barangkeluar', {type: QueryTypes.SELECT}
    );

    res.json(history)
}*/