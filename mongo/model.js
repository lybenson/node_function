var mongoose = require('mongoose');
var uri = 'mongodb://username:password@hostname:port/database';
uri = 'mongodb://localhost/hfuu';

mongoose.connect(uri);

// Model和Schema

var BookSchema = new mongoose.Schema({
	name: String,
	author: String,
	publishTime: Date
});

mongoose.model('Book', BookSchema);