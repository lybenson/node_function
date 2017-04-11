var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
// res.cookie会将填入Response Header中的Set-Cookie，达到在浏览器中设置cookie的作用
// res.cookie(name, value [, options]);
// 参数有: 
// name: cookie名称; 
// value: cookie值;
// options: 可选参数包括
// 		domain: cookie在什么域名下有效，类型为String,。默认为网站域名
// 		expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。
// 		httpOnly: 只能被web server访问，类型Boolean。如果在Cookie中设置了“httpOnly”属性，则通过程序（JS脚本、applet等）将无法读取到Cookie信息，防止XSS攻击产生
// 		maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。
// 		path: cookie在什么路径下有效，默认为'/'，类型为String
// 		secure：只能被HTTPS使用，类型Boolean，默认为false
// 		signed:使用签名，类型Boolean，默认为false。`express会使用req.secret来完成签名，需要cookie-parser配合使用`
	res.cookie("account", {
		"account": "lybenson", 
		"hash": "rsasdkkl;kw;lkl;saksdl;kas;d"
	}, 
	{
		maxAge: 60000
	});

	// 删除cookie  res.clearCookie(name [, options]);
	

	// 利用cookie-parser读取cookie
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/list', function(req, res, next) {

	// 获取cookie  req.cookies或者req.signedCookies
	if (req.cookies['account']) {
		res.send('cookie exist');
	}
  res.send('cookie is not exist');
});

module.exports = router;
