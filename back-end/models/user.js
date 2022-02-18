module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("Users", 
    {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false
        },
        accountLevel: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return users
}