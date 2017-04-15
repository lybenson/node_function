var express = require('express');
var router = express.Router();
var passport = require('../passport-config');
/* GET home page. */

// localhost:3000?username=lybenon&password=123456
router.get('/', passport.authenticate('local'), function(req, res, next) {
  console.log('user:'+JSON.stringify(req.user)); //{ uname: 'lybenon', psd: '123456' }
  console.log('session:'+JSON.stringify(req.session)); //{ passport: { user: { uname: 'lybenon', psd: '123456' } } }
  console.log(req.isAuthenticated());
  res.send('asjdjasdl');
});

router.get('/lybenson', function(req, res, next) {
	console.log('session.passport:'+JSON.stringify(req.session.passport));
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		res.send('success');
	} else {
		res.send('failure');
	}
});

module.exports = router;
