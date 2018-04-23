module.exports = function (sequelize, DataTypes){
        //1         //2
    return sequelize.define('user', {
        username: DataTypes.STRING, //3
        userLastName: DataTypes.STRING,
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING //3
    });
};

//1. a function with a Sequelize object that calls define method.
//2. Parameter 1 will create a user table in Postgres.
//3. An object with username and passwordhash that will be the columns in the table.