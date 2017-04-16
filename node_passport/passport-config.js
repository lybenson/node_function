var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log('username:' + username + '--password:'+password)
		var user = {
			uname: username,
			psd: password
		}
		// done(null, user);
		return done(null, false, { message: 'Incorrect password.' });
	}
));

// 存储到session调用
passport.serializeUser(function(user, done) {
	console.log('1111')
	done(null, user.uname); //将user.uname存储到session中
});

// 读取session时调用。
passport.deserializeUser(function (uname, done) {
	var user = {
		uname: username,
		psd: '123456'
	}
	done(null, user)
});
// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中（在这里
// 存到 session 中的是用户的 username）。在这里的 user 应为我们之前在 new
// LocalStrategy (fution() { ... }) 中传递到回调函数 done 的参数 user 对象（从数据// 库中获取到的）
// passport.serializeUser(function (uname, done) {
//   done(null, user.username);
// });

// // deserializeUser 在每次请求的时候将会根据用户名读取 从 session 中读取用户的全部数据
// // 的对象，并将其封装到 req.user
// passport.deserializeUser(function (uname, done) {

// });

module.exports = passport;