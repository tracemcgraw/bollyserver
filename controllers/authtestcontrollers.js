var router = require('express').Router();
var sequelize = require('../db');
var UserModel = sequelize.import('../models/user');
var AuthTestModel = sequelize.import('../models/authtest');

//GET all items for individual user
router.get('/', function(req, res){
    var userid = req.user.id;

    AuthTestModel
    .findAll({
        where: { owner: userid }
    })
    .then(
        function findallSuccess(data){
            res.json(data);
        },
        function findAllError(err){
            res.send(500, err.message);
        }
    );
});

//POST single item for individual user
router.post('/', function(req, res){
    var owner = req.user.id;
    var result = req.body.log.result;
    var description = req.body.log.description;
    var def = req.body.log.def

    AuthTestModel
    .create({
        owner: owner,
        result: result,
        description: description,
        def: def
    })
    .then(
        function createSuccess(authtestdata){
            res.json({
                authtestdata: authtestdata
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

//GET single item for individual user
router.get('/:id', function(req, res){
    var data = req.params.id;
    var userid = req.user.id;

    AuthTestModel
    .findoOne({
        where:{
            id: data, 
            owner: userid,
            
        }
    }).then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
});

//DELETE item for individual user

router.delete('/delete/:id', function(req, res){
    var id = req.body.log.id; 
    AuthTestModel
    .destroy({
        where:{
            id: id, 
           
        }
    }).then(
        function deleteLogSuccess(data){
            res.send('You removed a log');
        },
        function deleteLogError(err){
            res.send(500, err.messgae);
        }
    );
});


//UPDATE item for individual user

router.put('/update/:id', function(req, res){
    var data = req.params.id;
    var authtestdata = req.body.log;
    var result = req.body.log.result;
    var description = req.body.log.description;
    var def = req.body.log.def
    
    console.log(authtestdata)

    AuthTestModel
    .update({
        result: req.body.log.result,
        description: req.body.log.description,
        def:req.body.log.def
    },
    {where: {id: data}}
).then(
    function updateSuccess(updatedLog){
        res.json({
            authtestdata: authtestdata
        });
    },
    function updateError(err){
        res.send(500, err.message);
    }
)
});

module.exports = router;