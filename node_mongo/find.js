var mongoose = require('mongoose');
require('./model.js');

var Book = mongoose.model('Book');

Book.find({}, function(err, docs) { //查询条件,回调
	if (err) {
		console.log('err:', err);
		return;
	}
	console.log('result:', docs);
})

Book.findOne({
	author: 'Jim'
}, function(err, doc) {
	if (err) {
		console.log('err:', err);
		return;
	}
	//修改返回的结果
	docs.name = 'Tomas';
	doc.save();
	console.log('result:', docs);
});


Book.findOne({
	author: 'Jim'
}, function(err, doc) {
	if (err) {
		console.log('err:', err);
		return;
	}
	//删除返回的结果
	if (doc) {
		doc.remove();
	}
});

//多条件查询
var conditions = {
	$or: [{
		author: 'Jame'
	}, {
		author: 'Jim'
	}]
}
Book.find(conditions, function(err, docs) {
	if (err) {
		console.log('err:', err);
		return;
	}
	console.log('conditions:', conditions, 'result:', docs);
})