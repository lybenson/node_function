# 流程详解
访问请求 localhost:3000?username=lybenon&password=123456

在对应的路由中使用passport.authenticate('local')来处理请求

当调用passport.authenticate('local')时,就会去passport-config.js文件中调用local策略。并传入请求参数username和password到策略的回调函数中来进行授权认证。如果成功则调用done(null, user); 失败则调用done(null, false).
(此示例中是设置为成功的,你也可以使用mongodb来查找验证用户是否存在)

成功后将自定义的user放到done(null, user)中作为参数。

调用done(null, user)会将user放到req.user中。并将user放到session中(默认情况下session是开启的), session内容为 passport: user。
这里需要注意的是: 开启session后必须要实现serializeUser函数用于压缩内容,减小session存储大小。当然你也可以不实现,但如果不实现就必须禁止session,通过passport.authenticate('local', { session: false }).

# 使用session和cookie
express-session 1.5.0开始不再需要cookie-parser中间件。所以使用session的时候可以不必引入cookie-parser中间件。

流程: express-session将session数据保存在服务器,并设置session id给cookie发送给浏览器。设置session由passport自动完成。当浏览器再次发送请求时，如果session没过期,会在请求头带上cookie发送给服务器。在服务端调用req.isAuthenticated()会去读取session中的内容,如果session存在则返回true,否则返回false。

# 使用express-session和passport
app.use(session({ 
	secret: 'keyboard cat', 
	resave: false, 
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

要使用session需如上述操作。

通过req.isAuthenticated()可以判断是否已授权。已授权返回true.
此句代码会接收浏览器发送的cookie,而cookie中保存session id。通过session id获取session。如果session id存在就会去读取session。读取session会调用passport的deserializeUser来反序列化session。



