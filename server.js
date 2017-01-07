var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://localhost/emberData');

var noteSchema = new mongoose.Schema({
	title: 'string',
	content: 'string',
	author: 'string'
});

var NoteModel = mongoose.model('note',noteSchema);
//New lines!
app.get('/api/',function(req,res) {
	res.send('Working');
});

app.get('/api/notes',(req, res) => {
	NoteModel.find({}, (err, docs) => {
		if(err) { 
		res.send({error:err});
		}
		else {
		res.send({note:docs});
		}
	});
});

var serverStart = app.listen('4500', function() {
	console.log(`Server listing on port ${serverStart.address().port}`);
});
