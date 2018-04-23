require('dotenv').config();// We can make items in an .env file available to the whole application.
var express = require('express'); //1
var app = express(); //2
var test = require('./controllers/testcontrollers')//2.1
var authTest = require('./controllers/authtestcontrollers')
var user = require('./controllers/usercontrollers')
var sequelize = require('./db');//3.1
var bodyParser = require('body-parser');//4.1

sequelize.sync(); //3.2 tip: {force: true} for resetting tables

app.use(bodyParser.json()); //4.2

app.use(require('./middleware/headers')); //Activate our headers, must come before routes are declared.


app.use('/api/test', function(req,res){
    res.send("This is data from the /api/test endpoint. It's from the server.");
});
        //2.2   //2.3
app.use('/test', test);

app.use('/api/user', user);

//protected routes
app.use(require('./middleware/validate-session')); //2
app.listen(3000, function(){
    console.log('App is running and nodemon is working.'); //5
});
app.use('/api/log', authTest); //3













//1. We require the use of the express npm package we installed.
//2. We create an instance of express, we are firing off a top-level express()function,
//   a function exported by the Express Module. Allows us to create an Express App.
//3. app.listen will use express to start a UNIX socket. Listen for connections on path.
//4. The given path is localhost:3000 
//5. We call a call back function when the connection happens with a simple console.log.

//2.1 We import the route object that we just created and stored in test variable.
//2.2 We call app.use. Parameter 1 is our path/base url called /test. our base url will look
//    like this: http://localhost:3000/api/test
//2.3 Parameter 2 we pass in test. All routes created in testcontroller.js will be sub-routes.
//    http://localhost:3000/api/test/sometypeofbaseurl

//3.1 Create a sequelize variable that imports the db file.
//3.2 Use the variable and call .sync() . This method will ensure that we sync all defined 
//    models to the database.

//4.1 We pull in the body-parser library and store it in bodyParser variable.
//4.2 This app.use statement MUST go above any routes. Any routes aouve this statement will 
//    not be able to use the body-parser library.
//app.use(bodyParser.json()) tells te application that we want json to be used as we process this request.