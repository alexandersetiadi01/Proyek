module.exports = (sequelize, DataTypes) => {
    const barangMasuk = sequelize.define('barangMasuk',
    {
        namabarang:{ //FK master barang
            type: DataTypes.STRING,
            allowNull: false
        },
        kodemasuk:{ //PK auto increment
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kodePO:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        namaPenerima:{
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        noSuratJalan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tgl:{ 
            allowNull: false,
            type: DataTypes.DATEONLY
        }
    },
    {
        freezeTableName: true,
    });
    return barangMasuk;
}