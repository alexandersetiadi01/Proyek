const { masterBarang, barangMasuk, barangKeluar, sequelize, history } = require("../models");
const { QueryTypes } = require('sequelize');
const db = require("../models");
const Op = db.Sequelize.Op;

exports.seeInventory = async (req, res) => {
    const inventory = await barangMasuk.findAll({
        include:[{
            model: barangKeluar
        }]
    });

    res.json(inventory)
};


exports.addHistory = async (req, res) => {
    const barang = await db.barangMasuk.create({
        proyek: req.body.proyek,
        namabarang: req.body.namabarang,
        quantity: req.body.quantity,  
        tgl: req.body.tgl,
        status: req.body.status,        
        lokasi: req.body.lokasi
    });
    res.json(barang)
};

exports.seeHistory = async (req, res) => {
    const history = await history.findAll();

    res.json(history)
}

/*
exports.seeHistory = async (req, res) => {
    const history = await sequelize.query(
        'SELECT * FROM barangmasuk, barangkeluar', {type: QueryTypes.SELECT}
    );

    res.json(history)
}*/