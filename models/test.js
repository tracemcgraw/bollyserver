//7                             //1
module.exports = function(sequelize, DataTypes){
                      //2    //3  
    return sequelize.define('test', {
        //5       //6
        testdata: DataTypes.STRING
    });
};

//1. We run an anonymous function that has two parameters: sequelize and DataTypes.
//   The function will return the value of what is created by sequelize.define.
//2. We use sequelize object to call the define method. .define() is a Sequelize method
//   that will map model properties in the server file to a table in Postgres.
//3. Parameter 1 we pass the string 'test'. This will become a table called test in Postgres
//4. Parameter 2 is an object. Any key/value pairs in the following object will become.
//   columns of the table. This object will pass properties to create to create many tables.
//5. testdata is a key in our model object that will be a column in our databse.
//6. DataTypes.STRING is our value for the testdata property. Since its defined as a STRING value,
//   any information to be held in that column MUST be a string data-type.
//   DataTypes is a parameter in the function brought in through Sequelize.
//7. The model is eported to allow Sequelize to create the tests table with the testdata column
//   the next time the server connects to the databse and a user makes a POST request that uses the model.