//Will check to see if the request has a token attached for the session the user wishes to start.

var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var UserModel = sequelize.import('../models/user');

module.exports = function(req, res, next){
    if (req.method == 'OPTIONS'){
         next()
    } else {
    var sessionToken = req.headers.authorization; //1
    console.log(sessionToken);//2
    if(!sessionToken) return res.status(403).send({auth: false, message: 'No token provided.'}); //3
    else{//4
        jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {//5
            if(decoded){
                UserModel
                .findOne({
                    where: {
                        id: decoded.id
                    }
                }).then(user =>{ //6
                    req.user = user; //7
                    next();
                },
                function(){ //8
                    res.status(401).send({error: 'Not authorized'});
                });
            }else{
                res.status(400).send({error: 'Not authorized'});
            }
        });
    }
    }
}

//1. Variable sessionToken is created to hold the token, with is pulled from the authorization header of the request coming in.
//2. The token is printed to the console. This is purely for debugging purposes to verify that the token is being sent to server.
//   Will take in final code.
//3. If no token is present, the 403 Forbidden error is returned as the response.
//4. No user property is ever provided in the request so only tokens will get checked. This prevents unauthorized use of a token.
//5. The verify method decodes the token with the provided secret, the sends a callback with two variables.
//   If successful, decoded will contain the decoded payload.
//   If not, decoded remains undefined. err is null by default.
//6. If decoded has a value, the Sequelize findOne method looks for an id in th users table that matches the decoded.id property. 
//   This value is passed to the callback.
//7. The callback sets the user value for the request as the id value passed to it then sends the request on to its next destination.
//   This property will be necessary later in adding to the database.
//8. If no matching id is found, an error message is thrown.
//9. If no value for decoded, an error message is thrown.