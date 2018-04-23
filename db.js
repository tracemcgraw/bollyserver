const Sequelize = require('sequelize'); //1

//2                 //3         //4     //5         //6
const sequelize = new Sequelize('bolly','postgres','Vegan123*', {
    host: 'localhost', //7
    dialect: 'postgres'  //8
});
//9         //10            //11
sequelize.authenticate().then(
    function(){ //12
        console.log('Connected to bolly postgres database');
    },
    function(err){ //13
        console.log(err);
    }
);
                //14
module.exports = sequelize;


//1. Import Sequelize package.
//2. Created instance of Sequelize with variable sequelize.
//3. Use the constructor to vreate a new Swquelize object
//4. Identify the db table to connect to. aka bolly
//5. The usernamme for the db.
//6. The password for the local db.
//7. The host points to the local port for Sequelize. This is 5432.
//8. Identify the QL dialect being used.
//9. Use sequelize variable to access methods.
//10. Call the authenticate() method.
//11. authenticate() returns a promise. Use .then().
//12. Fire a function that shows if we're connected.
//13. Fire an error function if any errors.
//14. Export the module.