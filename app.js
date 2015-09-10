var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/materials');
var Material = require('./models/material');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3030;

// middleware to use for all requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    next();
});


router.route('/materials')

    .post(function(req, res) {
        var material = new Material();
        if(!req.body.materialnumber || !req.body.materialdescription){
            res.status(400);
            res.send({
                status:400,
                message:"Required parameter missing, you must provide both a materialnumber and materialdescription parameter"
            });
            res.end();
        }
        else {
            material.materialnumber = req.body.materialnumber;
            material.materialdescription = req.body.materialdescription;

            material.save(function (err) {
                if (err) {
                    res.status(500);
                    res.send({
                        status: 500,
                        error: err
                    });
                    res.end();
                }
                else {
                    res.json({
                        status: 200,
                        material: material
                    });
                    res.end();
                }
            });
        }

    })
    .get(function(req, res) {
        Material.find(function(err, materials) {
            if (err) {
                res.status(500);
                res.send({
                    status:500,
                    error:err
                });
                res.end();
            }
            else {
                res.json({
                    status: 200,
                    materials: materials
                });
                res.end();
            }
        });
    });


router.route('/materials/:materialnumber')

    .get(function(req, res) {
        Material.findOne({'materialnumber': req.params.materialnumber}, function(err, material) {
            if (err){
                res.status(500);
                res.send({
                    status:500,
                    error:err
                });
                res.end();
            }
            if(!material){
                res.status(404);
                res.send({
                    status:404,
                    message:"No material found for that material number"
                });
                res.end();
            }
            else {
                res.json({
                    status:200,
                    material:material
                });
                res.end();
            }
        });
    })
    .put(function(req, res) {

        Material.findOne({'materialnumber': req.params.materialnumber}, function(err, material) {

            if (err) {
                res.status(500);
                res.send({
                    status:500,
                    error:err
                });
                res.end();
            }


            if (!req.body.materialnumber || !req.body.materialdescription) {
                res.status(400);
                res.send({
                    status:400,
                    message:"You must provide a valid parameter for materialnumber and materialdescription.  Changes can be made to one or both parameters"
                });
                res.end();
            }
            else {

                material.materialnumber = req.body.materialnumber;
                material.materialdescription = req.body.materialdescription;

                material.save(function (err) {
                    if (err) {
                        res.status(500);
                        res.send({
                            status: 500,
                            error: err
                        });
                        res.end();
                    }
                    else {
                        res.json({
                            status: 200,
                            material: material
                        });
                        res.end();
                    }
                });
              }
        });

    })

    .delete(function(req, res) {
        Material.remove({
            materialnumber: req.params.materialnumber
        }, function(err, material) {
            if (err){
                res.status(500);
                res.send({
                    status:500,
                    error:err
                });
                res.end();
            }
            else {

                res.json({
                    status: 200,
                    message: req.params.materialnumber + " was deleted"
                });
                res.end();
            }
        });
    });

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);