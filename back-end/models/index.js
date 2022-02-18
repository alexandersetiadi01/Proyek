const dbConfig = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    //max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.masterBarang = require("./masterBarangModel")(sequelize, Sequelize);
db.barangKeluar = require("./barangKeluarModel")(sequelize, Sequelize);
db.barangMasuk = require("./barangMasukModel")(sequelize, Sequelize);

db.barangMasuk.belongsTo(db.masterBarang, {foreignKey: 'namabarang', source: 'namabarang'});
db.barangKeluar.belongsTo(db.masterBarang, {foreignKey: 'namabarang', source: 'namabarang'});

module.exports = db;