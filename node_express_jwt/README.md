# 简介

验证JsonWebTokens并设置`req.user`的中间件。

此模块允许在Node.js应用程序中使用JWT tokens来验证HTTP请求。JWT通常用于保护API，并且通常使用OpenID Connect发布。

## 安装

```shell
$ npm install express-jwt
```
## 使用

#### 基本使用

JWT认证中间件使用JWT来认证。如果token有效，`req.user`将被设置为已解码的JSON对象，以供中间件来进行授权和访问控制。

示例：

```javascript
var jwt = require('express-jwt');

app.get('/protected',
  jwt({secret: 'shhhhhhared-secret'}),
  function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });
```

您也可以指定 audience 和/或 issuer 属性：

```javascript
jwt({ secret: 'shhhhhhared-secret',
  audience: 'http://myapi/protected',
  issuer: 'http://issuer' })
```

> 如果JWT有一个过期时间（exp），也会被检查

如果您使用base64编码秘钥secret，需要使用`Buffer`对象编码秘钥而不是字符串

```javascript
jwt({ secret: new Buffer('shhhhhhared-secret', 'base64') })
```

或者，您可以使一些路径不进行认证，你可以设置在要获取token的路由中不验证。如下所示：

```javascript
app.use(jwt({ secret: 'shhhhhhared-secret'}).unless({path: ['/token']}));
```

这在应用于多个路由时特别有用。在上面的例子中，`path`可以是一个字符串，一个正则表达式或数组。

> 有关.unless语法的更多详细信息，包括其他选项，请参阅[express-unless](https://github.com/jfromaniello/express-unless)。

该模块还支持使用公钥/私钥对来签名的token。而不是使用秘钥的形式，你可以使用公钥指定Buffer

```javascript
var publicKey = fs.readFileSync('/path/to/public.pub');
jwt({ secret: publicKey });
```

默认情况下，解码的token会附加到`req.user`，但可以使用`requestProperty`选项进行配置。

```javascript
jwt({ secret: publicKey, requestProperty: 'auth' });
```

token也可以使用`resultProperty`选项附加到`result`对象。此选项将覆盖任何`requestProperty`。

```javascript
jwt({ secret: publicKey, resultProperty: 'locals.user' });
```

`resultProperty`和`requestProperty`都使用[lodash.set](https://lodash.com/docs/4.17.4#set)并将接受嵌套的属性路径。

可以使用`getToken`选项创建自定义函数用来获取请求中的token。如果你通过请求参数或cookie传递token，这将非常有用。你也可以在这个函数中抛出一个错误，它将被`express-jwt`处理。

```javascript
app.use(jwt({
  secret: 'hello world !',
  credentialsRequired: false,
  // 自定义定义token来源 可来自header或者请求参数
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));
```

#### Multi-tenancy

如果您正在开发一个应用程序，其中用于签名token的秘钥不是静态的，您可以提供回调函数作为secret参数。该函数形式是：`function(req，payload，done)`：

* req（Object）：express中 request 对象
* payload（Object）：jwt中的声明参数
* done（Function）：具有签名功能的函数function(err, secret)，在使用到秘钥时被调用。
  * err（Any）：错误发生
  * secret（String）：用于验证JWT的秘钥。

下面的示例，假设secret基于issuer变量：

```javascript
var jwt = require('express-jwt');
var data = require('./data');
var utilities = require('./utilities');

var secretCallback = function(req, payload, done){
  var issuer = payload.iss;

  data.getTenantByIdentifier(issuer, function(err, tenant){
    if (err) { return done(err); }
    if (!tenant) { return done(new Error('missing_secret')); }

    var secret = utilities.decrypt(tenant.secret);
    done(null, secret);
  });
};

app.get('/protected',
  jwt({secret: secretCallback}),
  function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });
```

#### 撤销令牌 

有可能需要撤销一些令牌，以便不再使用它们。您可以提供一个函数给isRevoked选项。签名函数是`function(req，payload，done)`：

* req(Object): express中 request 对象
* payload(Object)：jwt中的声明参数
* done(Function): 当检查到token被撤销，就会调用函数`function(err，revoked)`。
  * err(Any)：错误发生
  * revoked(Boolean)：如果JWT被撤销，则为true，否则为false。

示例：使用`iss`、`jti`来验证jwt：

```javascript
var jwt = require('express-jwt');
var data = require('./data');
var utilities = require('./utilities');

var isRevokedCallback = function(req, payload, done){
  var issuer = payload.iss;
  var tokenId = payload.jti;

  data.getRevokedToken(issuer, tokenId, function(err, token){
    if (err) { return done(err); }
    return done(null, !!token);
  });
};

app.get('/protected',
  jwt({secret: 'shhhhhhared-secret',
    isRevoked: isRevokedCallback}),
  function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });
```

#### 错误处理

默认情况下，当token无效时会引发错误，因此您可以添加自定义逻辑来管理未经授权的访问，如下所示：

```javascript
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});
```

您可能希望使用此模块来识别注册用户，同时仍然提供对未注册用户的访问。您可以使用`credentialsRequired`选项来执行此操作：

```javascript
app.use(jwt({
  secret: 'hello world !',
  credentialsRequired: false
}));
```

#### 关联的模块

* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) ：JSON Web Token的签名和认证
* [express-jwt-permissions](https://github.com/MichielDeMey/express-jwt-permissions)：JWT tokens的权限中间件
