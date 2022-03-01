module.exports = (sequelize, DataTypes) => {
    const proyeks = sequelize.define('proyeks',
    {
        namaProyek:{ //PK
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        /*Lokasi:{
            type: DataTypes.STRING,
            
        }*/
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return proyeks;
}