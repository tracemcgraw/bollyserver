//1                         //2
module.exports = function(req, res, next){
    //3                 //4
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //5
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //6
    //7
    next();
};

//1. module.exports allows us to export this module to be used in another file.
//2. Req refers to the request from the client, focusing on any headers present on the request object.
//   Res refers to the response and will be used to present which types of headers are allowed by the sever.
//   next tells middleware to countinue the process. 
//3. We call res.header so that the server sill repond with what kind of headers are allowed in the request.
//4. We use the specific access-control-allow-origin header to tell the sever the specific origin locations
//   that are allowed to communicate with the server. The * is known as a wild-card meaning everything is allowed
//   Here it's saying that requests originating from any location are allowed to communicate with the database.
//5. HTTP methods that the sver will allow to be used.
//6. Specific header types that the sever will accept from the client.
//7. next sends th request along to its next destination. This could be the API endpoint or another middleware function
//   designed to do something else.