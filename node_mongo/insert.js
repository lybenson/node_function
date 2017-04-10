var mongoose = require('mongoose');
require('./model.js');

var Book = mongoose.model('Book');

var book = new Book({
	name: 'Tom',
	author: 'Jack',
	publishTime: new Date()
});

book.name = 'benson'

book.save(function(err) {
	console.log('save status:', err ? 'failed' : 'success');
});