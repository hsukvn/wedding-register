#!/usr/bin/env node

var express  = require('express');
var app      = express();

var mongoose = require('mongoose');
var morgan = require('morgan');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var AttendeeScema = new mongoose.Schema({
    name: { type: String, required: true },
    relation: { type: Number, min: 0, max: 1 },
    companion: [{
		name: String,
		vegetarian: Boolean
    }],
    number_of_kid_seat: { type: Number, min: 0, max: 2 },
	vegetarian: Boolean,
	invitation: Boolean,
	email: String,
	phone: String,
	post_code: String,
	address: String
});

var Attendee = mongoose.model('attendee', AttendeeScema);

// configuration =================
mongoose.connect('mongodb://localhost:27017/wedding', { useMongoClient: true });

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());

app.get('/api/attendee', function(req, res) { // FIXME: only for debug
    Attendee.find(function(err, attendee) {
        if (err) {
            res.send(err);
        } else {
	        res.json(attendee);
	    }
    });
});

app.post('/api/attendee', function(req, res) {
    Attendee.create({
        name: req.body.name,
        relation: req.body.relation,
        companion: req.body.companion ? req.body.companion : [],
        number_of_kid_seat: req.body.number_of_kid_seat ? number_of_kid_seat : 0,
        vegetarian: req.body.vegetarian ? vegetarian : false,
        invitation: req.body.invitation ? invitation : false,
        email: req.body.email ? email : '',
        phone: req.body.phone ? phone : '',
        post_code: req.body.post_code ? post_code : '',
        address: req.body.address ? address : '',
    }, function(err, attendee) {
        if (err) {
            res.send(err);
        } else {
			res.status(200).json({status:"ok"});
        }
    });
});

app.delete('/api/attendee/:id', function(req, res) {
    Attendee.remove({
        _id : req.params.id
    }, function(err, attendee) {
        if (err) {
            res.send(err);
        } else {
			res.status(200).json({status:"ok"});
        }
    });
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");
