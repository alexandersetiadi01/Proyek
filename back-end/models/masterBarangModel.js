module.exports = (sequelize, DataTypes) => {
    const masterBarang = sequelize.define('masterBarang',
    {
        /*kodebarang:{ //belum perlu
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }, */
        namabarang:{ //PK
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        category:{
            type: DataTypes.STRING,
            
        },
        subCategory:{
            type: DataTypes.STRING,
            
        },
        type:{
            type: DataTypes.STRING
        },
        merk:{
            type: DataTypes.STRING
        },  
        satuan:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ukuran:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return masterBarang;
}