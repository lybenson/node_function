var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.user+'-------')
  res.render('index', { title: 'Express' });
});


// login 接口 生成jwt,此接口不通过express-jwt验证 已在app.js中设置忽略该接口
router.post('/login', function(req, res, next) {
	var authToken = jwt.sign({username: req.body.uname}, "mysecret");
  res.status(200).json({token: authToken});
});


router.post("/user", function(req, res) {
  var uname = req.body.uname;

  if (!uname) {
    return res.status(400).send("username require");
  }

  res.status(200).json({
  	uname: uname
  })
})

module.exports = router;
