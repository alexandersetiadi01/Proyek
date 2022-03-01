module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", 
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
            // nama-nama role: logistic, pengawas
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    
    );
    return users
}