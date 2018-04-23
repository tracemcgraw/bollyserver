var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var UserModel = sequelize.import('../models/user');
var bcrypt = require('bcryptjs'); //import bcryptjs 
var jwt = require('jsonwebtoken');

//user endpoints

router.post('/', function(req, res){
    var username = req.body.user.username;
    var userLastName = req.body.user.userLastName;
    var email = req.body.user.email;
    var pass = req.body.user.password;

    UserModel
    .create({
        username: username,
        userLastName: userLastName,
        email: email,
        passwordhash: bcrypt.hashSync(pass, 10) //B1
    }).then(
        function createSuccess(user){
            //T1            //T2      //T3      //T4                //T5
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created', //1
                sessionToken: token //T6
            });
        },
        function creatError(err){
            res.send(500, err.message);
        }
    );
});
     //7
     router.post('/login', function(req, res) {
        UserModel
        .findOne( 
            { where: {
                 username: req.body.user.username 
                } 
            }).then(
            function(user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                        //1
                        if (matches) {
                            //2
                            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                            res.json({  //3
                                user: user,
                                message: "successfully authenticated",
                                sessionToken: token
                            });
                        }else { //4
                            res.status(502).send({ error: "you failed, yo" });
                        }
                    });
                } else {
                    res.status(500).send({ error: "failed to authenticate" });
                }
            },
            function(err) {
                res.status(501).send({ error: "you failed, yo" });
            }
        );
    });

module.exports = router;

//1. Along with the user object that gets returned as JSON, we can send a message in the response.

//Token
//T1 Create a variable to hold the token.
//T2 .sign() creates the token. It takes at least 2 parameters: the payload and the signature. 
//   Can also supply specific options or a callback.
//T3 This is the payload, or data we're sending. user.id is the primary key of the user table.
//   is the number assigned to the user when created in the database.
//T4 This is the signature, which is used to help encode and decode the token. 
//   You can make it anything, and we will make this private. The system goes outside the current file 
//   to the .env file. It looks for something called JWT_SECRET. the value of the secret is stored in that
//   enviroment variable.
//T5 We set an option to make the token expire. 1 Day
//T6 We pass the value of the token back in our response. The server has now assigned a token to a specific user,
//   and the client will have that token to work with (once we have a client).

// Most of the time, the client will store the token in localStorage, where it can be used in future request. 
// The token will be valid until it is removed or expired.

//B1 bcrypt.hashSync() Takes the password, bcrypt hashes plain text. Then gerates a salt, long random string. Then combines them.

// /sign
//1. findOne() method is a Sequelize method that fids something within the database that we tell it to look for. 
//   aka Data Retrieval. 
//2. where is an object within Squelize that tells the database to look for something matching its properties.
//3. We're looking in the username column in the user table for one thing that matches the value passed from the client.
//4. The promise is handled within the .then() function.
//5. A function that is called when the promise is resolved, and if successful, sends the user object back in the response.
//6. Function called if the promise is rejected. We print the error to the console.
//7. We're sending data this time, so we use router.post instead of router.get.

//bcrypt /signin

//B1 Check to make sure that a match for the username was found.
//B2 We use bcrypt to decrypt the hash value and compare it to the supplied password. 
//B3 We pull in the password value from the current request when the user is signing up.
//B4 This pulls hashed password value from the database.
//B5 Run a callback function that will run on either success or failure of compare.
//B6 If hashed password in the databse matches the one that has been entered, log that password value match. matches is boolean.
//B7 Handle a fail situation.

//token /signin
// We use the callback functio from the compare() method. If the username and password are a match, this will be true.
// Expression in the conditional will execute.
//2. Success, we will create a new token for the session. Uses jwt.sign() method simular in /createuser.
//3. We return the user object with a success message and sessionToken.
//4. If the passwords don't match or the username is not correct, we send a response telling the client 
//   authentication did not occur.