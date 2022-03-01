const db = require("../models");
const Op = db.Sequelize.Op;

exports.findProyek = async (req, res) => {
    const proyek = await db.proyeks.findOne({
        where: {namaProyek: req.body.namaProyek}
    });

    res.json(proyek)
};

exports.seeAllProyek = async (req, res) => {
    const proyek = await db.proyeks.findAll();

    res.json(proyek)
};

exports.createProyek = async (req, res) => {
    const proyek = await db.proyeks.create({
        namaProyek: req.body.namaProyek
    });

    res.json(proyek);
};