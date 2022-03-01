module.exports = (sequelize, DataTypes) => {
    const purchasing = sequelize.define('purchasing',
    {
        kodePO:{ //PK
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        namabarang:{
            type: DataTypes.STRING,
            allowNull: false
        },
        harga: {
            type: DataTypes.DOUBLE,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalHarga: {
            type: DataTypes.DOUBLE,
        },
        supplier: {
            type: DataTypes.STRING
        },
        tgl: {
            type: DataTypes.DATEONLY
        },
        proyek: {
            type: DataTypes.STRING,
            //allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return purchasing;
}