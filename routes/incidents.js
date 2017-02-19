/**
 * Created by you on 2/6/17.
 */
var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/inciweb');
var datetime = require('node-datetime');


/*
 Defines api endpoints
 Route handlers
 */

router.get('/', function (req, res) {
    var records = db.get('incidents');
    records.find({}, function (err, incidents) {
        if (err) throw err;
        res.json(incidents);
    });
});

router.post('/', function (req, res) {
    var records = db.get('incidents');
    var now = datetime.create().format('m/d/Y');

    records.insert({
        name: req.body.name,
        type: req.body.type,
        unit: req.body.unit,
        state: req.body.state,
        status: req.body.status,
        acres: req.body.acres,
        updated: now
    }, function (err, incident) {
        if (err) throw err;
        res.json(incident);
    });
});

router.get('/:id', function (req, res) {
    var records = db.get('incidents');
    records.findOne({_id: req.params.id}, function (err, incident) {
        if (err) throw err;
        res.json(incident);
    });
});

router.get('/search/:q', function (req, res) {
    var records = db.get('incidents');
    records.find({"$text": {"$search": req.params.q}}, function (err, incidents) {
       if (err) throw err;

       res.json(incidents);
    });
 });

router.put('/:id', function (req, res) {
    var records = db.get('incidents');
    var now = datetime.create().format('m/d/Y');
    records.update({
            _id: req.params.id
        },
        {
            name: req.body.name,
            type: req.body.type,
            unit: req.body.unit,
            state: req.body.state,
            status: req.body.status,
            acres: req.body.acres,
            updated: now
        }, function (err, incident) {
            if (err) throw err;
            res.json(incident);
        });
});

router.delete('/:id', function (req, res) {
    var records = db.get('incidents');
    records.remove({
        _id: req.params.id
    }, function (err, incident) {
        if (err) throw err;
        res.json(incident);
    });
});


module.exports = router;