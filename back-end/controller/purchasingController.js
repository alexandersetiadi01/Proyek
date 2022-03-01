const db = require("../models");
const Op = db.Sequelize.Op;

exports.createPurchasing = async (req, res) => {
    const purchase = await db.purchasing.create({
        namabarang: req.body.namabarang,
        kodePO: req.body.kodePO,
        harga: req.body.harga,
        quantity: req.body.quantity,  
        totalHarga: req.body.quantity * req.body.harga,
        tgl: req.body.tgl,
        supplier: req.body.supplier,
        proyek: req.body.proyek
    });

    res.json(purchase);
};

exports.seeAllPurchasing = async (req, res) => {
    const purchase = await db.purchasing.findAll();

    res.json(purchase);
};

exports.getInfo = async (req, res) => {
    const purchase = await db.purchasing.findAll({
        where: {
            namabarang: req.body.namabarang,
        }
    })
    res.json(purchase);
}

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};
