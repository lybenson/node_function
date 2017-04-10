var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/user_add', function(req, res, next) {
	var user = new User({
		uid: 1,
		username: "Benson"
	});
	user.save(function(err) {
		if (err) {
			res.send('Error');
			return next();
		}

		User.find({}, function(err, docs) {
			if (err) {
				res.send('Error');
				return next();
			}
			res.json();
		});
	});
});

module.exports = router;