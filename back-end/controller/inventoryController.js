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
    const barang = await db.inventory.create({
        //kodebarang: req.body.kodebarang,
        namabarang: req.body.namabarang,
        proyek: req.body.proyek,
        quantity: req.body.quantity
    });
    res.json(barang)
};

exports.seeAll = async (req, res) => {
    const inventory = await db.inventory.findAll();

    res.json(inventory);
};

exports.findItem = async (req, res) => {
    const found = await db.inventory.findByPk(req.query.namabarang);

    res.json(found);
}


//testing (failed)
exports.inventoryBarangMasuk = async (req, res) => {
    const found = await db.inventory.findByPk(req.body.namabarang);

    /*const update = await db.inventory.update(
        {   
            quantity: req.body.totalQTY
        },
        {
            where: {
                namabarang: req.body.namabarang
            }
        }
    )
    res.json(update);
    */
    
    if(found !== null){

        const update = await db.inventory.update(
            {   
                quantity: parseInt(req.body.quantity) + found.quantity
            },
            {
                where: {
                    namabarang: req.body.namabarang
                }
            }
        )
        res.json(update);
    }else{
        return;
    }
    
};

exports.inventoryBarangKeluar = async (req, res) => {
    const found = await db.inventory.findByPk(req.body.namabarang);
    
    if(found !== null){

        const update = await db.inventory.update(
            {   
                quantity: found.quantity - parseInt(req.body.quantity)
            },
            {
                where: {
                    namabarang: req.body.namabarang
                }
            }
        )
        res.json(update);
    }else{
        return;
    }
}

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};
