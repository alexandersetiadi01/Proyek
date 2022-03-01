module.exports = (sequelize, DataTypes) => {
    const activity = sequelize.define("activity", 
    {
        kode: { //kodemasuk atau kodekeluar
            type: DataTypes.STRING,
            allowNull: false
        },
        namabarang: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        progress: { //khusus barang keluar
            type: DataTypes.INTEGER
        },
        namaOrang: {
            type: DataTypes.STRING,
            
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        noSuratJalan: { //khusus barang masuk
            type: DataTypes.INTEGER
        },
        tgl: { //tgl barang
            type: DataTypes.DATEONLY,
        },
        tglUpdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
    })
}