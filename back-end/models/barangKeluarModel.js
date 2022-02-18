module.exports = (sequelize, DataTypes) => {
    const barangKeluar = sequelize.define('barangKeluar',
    {
        /*kodebarang:{ //belum pake
            type: DataTypes.STRING,
            allowNull: false
        },*/
        namabarang:{ //FK master barang
            type: DataTypes.STRING,
            allowNull: false
        },
        kodeKeluar:{ //PK
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        QTY:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        namaPengambil:{
            type: DataTypes.STRING,
            allowNull: false
        },
        progress:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tgl:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        
    },
    {
        freezeTableName: true,
        
    });
    return barangKeluar;
}