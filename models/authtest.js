module.exports = function(sequelize, DataTypes){
    return sequelize.define('authtestdata',{
        owner: DataTypes.INTEGER,
        result: DataTypes.STRING,
        description: DataTypes.STRING,
        def: DataTypes.STRING
    });
};

// We are creating another table called authtestdata in our database that can place behind an authentication barrier.
//1. We are porviding two porperties: authtestdata and owner.
//2. authtestdata is like a string
//3. The owner is a number, a foreign key, that will point to a specific user on the user table.