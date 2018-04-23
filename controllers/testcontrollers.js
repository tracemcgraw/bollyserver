var express = require('express');//1 
var router = express.Router(); //2 
var sequelize = require('../db'); //2.1
var TestModel = sequelize.import('../models/test'); //3.1
//3     //4  //5        //6
router.get('/', function(req, res){
    //7
    res.send('Test route completed!');
});

router.get('/about', function(req, res){
    res.send('This is our practice route!')
})

//2.2          //2.3
router.post('/one', function(req, res){
    res.send("Test 1 went through!")
});

router.post('/two', function(req, res){
    let testData = 'Test data for endpoint two'; //3.2

    TestModel //3.3
        .create({ //3.4
            //3.5
            testdata: testData //3.6
        })
        res.send('Test two went through!');
});

router.post('/three', function(req, res){
    var testData = req.body.testdata.item; //4.1

    TestModel
    .create({ //4.2
        testdata: testData
    })
    res.send('Test three went through!')
    console.log('Test three went through!');
    
});

router.post('/four', function(req, res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then( //5.1
        function message(){ //5.2
            res.send('Test 4 went through!');
        }
    );
});

router.post('/five', function(req, res){
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(              //6.1
        function message(data){
            res.send(data); //6.2
        }
    );
});

router.post('/six', function(req, res){
    var testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata){
            res.json({ //7.1
                testdata: testdata //7.2
            });
        }
    );
});

router.post('/seven', function(req, res){
    var testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata){
            res.json({
                testdata: testdata
            });
        },
        function createError(err){ //8.1
            res.send(500, err.message);
        }
    );
});

//8
module.exports = router;

//1. We import the Express Framework inside variable express. Creates Instance of Express.
//2. We create router variable. .Router() is a method in express, line 1., this will reuturn
//   a router object.
//3. We use the router object from the variable to access into Router() object methods.
//4. get() one of the methods in object, we call it. Allows us to complete HTTP GET request.
//5. Argument 1. is a path simular to 3000. 
//6. Argument 2. is a call back function, also known as a handler functionn. The functions is called 
//   when the application recieves a request to the specified route and HTTP method. Applicatinon listens for
//   requests that match the specified routes and methods. When match detected in calls the call back function.
//7. Inside the call back function, we call the res.send() this sends response objects.
//8. We export the module for usage outside of the file.

//2.1 We import sequelize from our db file.
//2.2 We are using the Express Router object to call the post method. Corresponds to the HTTP request that we are sending.
//    POST sends data through HTTP to the server, which will store data to the database.
//2.3 One will be the endpoint/route we are using. Out route will be named http://localhost:3000/test/one. After that will we 
//    call our call back function to send the message to our database.

//3.1 We import the tesh model and store it in TestModel variable. Use upper case for a model class with Sequelize.
//3.2 testData is going to have a fixed string that we'll use every time a POST request comes in.
//3.3 We use TetstModel variable to access the model that we are using. 
//3.4 .create() is a Sequelize method that allows us to create instance of the Test model and send it off to 
//    the db, as long as the data types match the model.
//3.5 testdata is the key in the object and it represents the colun bing used in nthe table.
//3.6 We pass the value of testData down to satisfy the key/value pair for the model. The string that we created will
//    be the valud stored in the variable.

//4.1 We use the req.body middleware provided by Express and append two more properties to it. This is what we are sending to
//    the database. req is the actual request, and body is where our data is being held. testdata is a property of body, while
//    item is a property of testdata.
//4.2 create() is Sequelize method. It creates a SQL statement that will insert our data into the databse.

//5.1 We call the then() method. The then() method returns a Promise. We use then() function to force the message to wait for the 
//    insert statement to finish.
//5.2 The callback function will print the success messgae to the console once testData is done running.

//6.1 It's important to note that the .then() method is chained to .create(). The whole expression could be read like this in one line.
//TestModel.create({testdata: testData}).then(function message(data) { res.send(data);});
//6.2 We have changed the data coming back in the response to the data that was persisted in Postgres. After the data is .create() and 
//    the .then() method returns a Promise that fires up a call back function holding the data that was just added.
// data is just a parameter name. It could be named anything.

//7.1 In our callback, rather than res.send(), we will invoke the .json() method. This will package our response as json.
//7.2 The same object that was added to the database is now being sent back to the client and storedin the testdata property.

//8.1 The addition we made here is an error function. If the creat() function returns an error, it will be
//    picked up by the createError() method. That method sends back a 500 error with a message.