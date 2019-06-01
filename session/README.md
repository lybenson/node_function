# 安装
```
npm install express-session
```
#API
```
var session = require('express-session')
```
#### session(options)
使用给定的选项创建会话中间件

##### 注意 `session`数据不会保存在`cookie`中，只保存`session ID`。`session`数据不会保存在`cookie`中，`session`数据只存储在服务器端。

##### 注意 从版本1.5.0开始，`cookie-parser`中间件不再需要被用于此模块。该模块现在直接在`req`/`res`上读取和写入`cookie`。如果使用`cookie-parser`可能会导致一些问题,如果该模块和`cookie-parser`之间的`secret`不一样,

##### 警告 默认的服务器端`session storages`是`MemoryStore`,其不能用于生产环境。因为在大多数情况下泄漏内存，所以一般用于调试和开发环境

##### Options
`express-session` 在`options`对象中接收下面这些属性
###### cookie
为`session id`的`cookie`设置对象, 默认值为`{ path: '/', httpOnly: true, secure: false, maxAge: null }`

下面是可以在此对象中设置的选项
###### cookie.domain
使用`cookie`的有效域,默认为当前域名
###### cookie.expires
`cookie`过期时间，类型为`Date`。如果没有设置或者设置为0，那么该`cookie`只在这个这个`session`有效，即关闭浏览器后，这个`cookie`会被浏览器删除。
###### cookie.httpOnly
只能被`web server`访问，类型`Boolean`。如果在`Cookie`中设置了`httpOnly`属性，则通过程序（JS脚本、applet等）将无法读取到`Cookie`信息，防止`XSS`攻击产生
###### cookie.maxAge
实现`expires`的功能，设置`cookie`过期的时间，类型为`String`，指明从现在开始，多少毫秒以后，`cookie`到期
###### cookie.path
`cookie`在什么路径下有效，默认为'/'，类型为`String`
###### cookie.sameSite
`boolean`或者`string`类型,用于定义`cookie`如何跨域发送。这是谷歌开发的一种安全机制,未来的一种`cookie`跨域授权处理方式
	true 设置SameSite属性为Strict,严格要求要求相同的站点
	false 不设置SameSite属性
	'lax' 将将SameSite属性设置为Lax，以实现相同的站点执行
	'strict' 将SameSite属性设置为strict, 严格相同的站点执行
注: 这是一个尚未完全标准化的属性，可能会在将来发生变化。这也意味着许多客户端可以忽略此属性.
###### cookie.secure
只能被`HTTPS`使用，类型`Boolean`，默认为`false`, 这就意味着使用`http`时`cookie`将不会在浏览器被设置。
如果您的`node.js`位于代理后面并使用`secure:true`，则需要在`express`中设置`trust proxy`,这样才能是`cookie`生效
```
var app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
```
为了在生产中使用`secure Cookie`，但允许在开发中进行测试，以下是基于`NODE_ENV`在快速启用此设置的示例
```
var app = express()
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
```
`cookie.secure`选项也可以设置为特殊值`“auto”`，使用此设置将自动匹配确定的连接安全性

###### genid
调用函数生成`session id`
默认值是一个使用`uid-safe`库生成ID的函数
```
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
```
###### name
`response`中设置的`cookie`的名称(从`request`中读取)
默认值是`connect.sid`
注: 如果有多个应用在同一主机下(即使端口号不同也是属于同一主机)，所以需要将session Cookie彼此分开, 最简单的方法是简单地为每个应用设置不同的名称。

###### proxy
在设置`secure Cookie`时,通过`X-Forwarded-Proto`头信任反向代理。
默认值是`undefined`
	true 使用"X-Forwarded-Proto"头.
	false 所有头信息会被忽略，只有在有直接的TLS/SSL连接的情况下，连接才被认为是安全的
	undefined express设置“trust proxy"

###### resave
每次请求都重新设置`session cookie`，假设你的`cookie`是6000毫秒过期，每次请求都会再设置6000毫秒。

###### rolling
强制在每个响应中设置`sesion id`到`cookie`中。到期将重置为原始`maxAge`。默认为`false`
注：当此选项设置为`true`但`saveUninitialized`选项设置为false时，将不会在具有未初始化`session`的响应中设置该`cookie`。

###### saveUninitialized
是指无论有没有`session cookie`，每次请求都设置个`session cookie` ，默认给个标示为 `connect.sid`
注：如果将`session`与`PassportJS`结合使用，`Passport`将会向`session`添加一个空的`Passport`对象，以便在用户进行身份验证后使用，这将被视为对`session`的修改，导致其被保存。这在`PassportJS 0.3.0`中已经修复

###### secret
生成`session id`的加密秘钥

###### store
`session`的存储器，默认为内存存储.可以使用`mongodb`或者`redis`进行存储。

###### unset
控制`req.session`的生命周期
	'destory' 请求结束时候session销毁
	'keep' session在存储中的值不变，在请求中的修改将会忽略，而不保存

#### req.seesion
要存储或访问`session`数据，只需使用请求属性`req.session`，它通常由存储器序列化为`JSON`，因此嵌套对象通常也很好的支持。如
```javascript
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

```
#### Session.regenerate(callback)
重新生成`session`,完成后将在`req.session`初始化新的`SID`和`Session`实例，并调用回调。

```javascript
req.session.regenerate(function(err) {

  // will have a new session here

})
```

#### Session.destroy(callback)
销毁`session`，并将取消设置`req.session`属性。一旦完成，将调用回调
```javascript
req.session.destroy(function(err) {
  // cannot access session here
})
```
#### Session.reload(callback)
从存储重新加载`session`数据，并重新填充`req.session`对象。一旦完成，将调用回调
```javascript
req.session.reload(function(err) {
  // session updated
})
```

#### Session.save(callback)
保存`session`数据到存储器中。数据被修改会自动调用此方法,所以通常不需要调用此方法。
```javascript
req.session.save(function(err) {
  // session saved
})
```

#### Session.touch()
更新`.maxAge`属性. 通常，这不需要调用，因为`session`中间件会自动执行。

### req.session.id
每个`session`都有一个与之相关联的唯一`ID`。此属性将包含`session ID`，无法修改

### req.session.cookie
每个会话都有一个唯一的`cookie`对象，这允许你更改每个访问者的`session cookie`,例如，我们可以将`req.session.cookie.expires`设置为`false`，以使`cookie`仅在用户代理的持续时间内保持。
`req.session.cookie.maxAge`将返回剩余时间,我们也可以重新分配一个新值来适当地调整`.expires`属性
```javascript
var hour = 3600000
req.session.cookie.expires = new Date(Date.now() + hour)
req.session.cookie.maxAge = hour
```
例如，当`maxAge`设置为`60000`（一分钟），并且`30`秒已经过去时，它将返回`30000`，直到当前请求完成，此时调用`req.session.touch()`将`req.session.maxAge`重置为原始价值
```javascript
req.session.cookie.maxAge // => 30000
```

### req.sessionID
要获取已加载`session`的`ID`，通过属性`req.sessionID`获取。这只是在加载/创建会话时设置的只读值。

# Session的存储器
默认的存储器是内存存储,但可以使用其他存储器
`connect-mssql`: `sql server`存储
`connect-db2`: `db2`存储
`connect-mongo`: `mongodb`存储
`connect-redis`: `redis`存储
`connect-memcached`: `memcached`存储
`session-file-store`: 文件存储
`express-mysql-session`: `mysql`存储


# 示例
```javascript
var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})
```
