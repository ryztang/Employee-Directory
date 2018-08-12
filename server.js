// All console.log are to test the functions

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('employeeList', ['employeeList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));	// Links index.html and controller.js (static files) to server
app.use(bodyParser.json());	// Parses body from input into json format

app.get('/employeeList', function (req, res) {
	console.log('I received a GET request');
	db.employeeList.find(function (err, docs) {	// Finds employeeList information in MongoDB, docs is employeeList data
		console.log(docs);
		res.json(docs);		// Sends employeeList back to controller.js in json format
	});
});

app.post('/employeeList', function (req, res) {
	console.log(req.body);
	db.employeeList.insert(req.body, function (err, doc) {	// Inserts employee from controller.js into MongoDB, doc is new employee object
		res.json(doc);	// Sends new employee back to controller.js in json format
	});
});

app.delete('/employeeList/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.employeeList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {	// Removes employee from MongoDB, id refers to local variable, doc refers to removed employee
		res.json(doc);	// Sends removed employee back to controller.js in json format
	});
});

app.get('/employeeList/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.employeeList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);	// Sends found employee to edit back to controller.js
	});
});

app.put('/employeeList/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.empname);
	db.employeeList.findAndModify({query: {_id: mongojs.ObjectId(id)},	// query finds employee in database to modify
		// update sets new employee information sent from controller.js
		update: {$set: {empid: req.body.empid, empname: req.body.empname, email: req.body.email, number: req.body.number, position: req.body.position, manager: req.body.manager}},
		new: true}, function (err, doc) {	// new specifies that this is a new update
			res.json(doc);	// Sends updated employee back to controller.js
		});
});

app.listen(3000);	// Specifies which connection server provides
console.log("Server running on port 3000");