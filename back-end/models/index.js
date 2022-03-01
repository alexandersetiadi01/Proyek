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
db.history = require("./historyModel")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);
db.proyeks = require("./proyekModel")(sequelize, Sequelize);
db.purchasing = require("./purchasingModel")(sequelize, Sequelize);
db.activity = require("./acivityModel")(sequelize, Sequelize);
db.inventory = require("./inventoryModel")(sequelize, Sequelize);
//db.masterBarang.hasMany(db.barangMasuk, {foreignKey: 'namabarang', targetKey: 'namabarang'})

db.barangMasuk.belongsTo(db.masterBarang, {foreignKey: 'namabarang', source: 'namabarang'});
db.barangKeluar.belongsTo(db.masterBarang, {foreignKey: 'namabarang', source: 'namabarang'});
//db.purchasing.belongsTo(db.barangMasuk, {foreignKey: "kodePO", source: "kodePO"});

//db.users.hasMany(db.proyeks, {through})
db.barangMasuk.belongsTo(db.purchasing, {foreignKey: "kodePO", source: "kodePO"});
//db.barangKeluar.belongsTo(db.purchasing, {foreignKey: "kodePO", source: "kodePO"});

/*
async function addUser(){
  const count = await db.users.count();

  if(count > 0){
    return;
  }else{
    const argon2 = require("argon2");

    let hash = await argon2.hash("test123", { type: argon2.argon2id });
    await db.users.createUser({ ID: "11111", username: "Alex", password: hash, accountLevel: ""});
  }
}

db.sync = async () => {
  await addUser();
}
*/
module.exports = db;