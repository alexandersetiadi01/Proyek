module.exports = (sequelize, DataTypes) => {
    const inventory = sequelize.define('inventory',
    {
        namabarang:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
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
    return inventory;
}