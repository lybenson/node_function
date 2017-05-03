var express = require('express');
var router = express.Router();

var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken')
// var token = jwt.sign()

const secret = 'mysecret'

/* GET home page.  return token */
router.post('/login', function(req, res, next) {
	var token = jwt.sign({ 
		uname: 'root', 
		exp: Math.floor(Date.now() / 1000) + (60 * 60) 
	}, secret);

	res.status(200).send(token)
});

// 请求头添加 Authorization: Bearer <token>
// token为post /login 返回的token
router.get('/vertify', function(req, res, next) {
	auth = req.headers.authorization
	token = auth.slice(7)

	console.log(token)
	jwt.verify(token, secret, function(err, decoded) {
		if (err) {
			res.status(401).send('UnAuthorization')
		}
		res.status(200).json(decoded)
	});

})

module.exports = router;
