const db = require("../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    /*const barang = {
        kodebarang: req.body.kodebarang,
        namabarang: req.body.namabarang,
        category: req.body.category, 
        subCategory: req.body.subCategory,
        type: req.body.type,
        merk: req.body.merk,  
        satuan: req.body.satuan,
        ukuran: req.body.ukuran
    };
    db.masterBarang.create(barang)
    .then(data => {
        res.send(data);
    }).catch(
        err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the masterbarang."
              });
        }
    )
    */
    const barang = await db.masterBarang.create({
        //kodebarang: req.body.kodebarang,
        namabarang: req.body.namabarang,
        category: req.body.category, 
        subCategory: req.body.subCategory,
        type: req.body.type,
        merk: req.body.merk,  
        satuan: req.body.satuan,
        ukuran: req.body.ukuran,
        price: req.body.price
    });
    res.json(barang)
};

exports.seeAll = async (req, res) => {
    const masterBarang = await db.masterBarang.findAll();

    res.json(masterBarang);
};

exports.searchByName = async(req, res) => {
    const name = req.body.namabarang;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null
    const masterBarang = await db.masterBarang.findAll({where:{condition}});

    res.json(masterBarang);
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};
