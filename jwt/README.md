## 简介
JWT(JSON WEB TOKEN)是一种用于双方之间传递安全信息的简洁的、URL安全的表述性声明规范。JWT作为一个开放的标准（ RFC 7519 ），定义了一种简洁的，自包含的方法用于通信双方之间以Json对象的形式安全的传递信息。因为数字签名的存在，这些信息是可信的，JWT可以使用HMAC算法或者是RSA的公私秘钥对进行签名。

## 应用场景

* 身份认证：一旦用户完成了登陆，在接下来的每个请求中包含JWT，可以用来验证用户身份以及对路由，服务和资源的访问权限进行验证。由于它的开销非常小，可以轻松的在不同域名的系统中传递，所有目前在单点登录（SSO）中比较广泛的使用了该技术
* 信息交换：在通信的双方之间使用JWT对数据进行编码是一种非常安全的方式，由于它的信息是经过签名的，可以确保发送者发送的信息是没有经过伪造的。

## JWT的结构

JWT包含了使用 `.` 分隔的三部分：

- Header 头部
- Payload 负载
- Signature 签名

相当于

```
xxxxx.yyyyy.zzzzz
```

### Header

在header中通常包含了两部分：token类型和采用的加密算法。

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
上例说明了这是一个使用了HMAC SHA-256算法的JWT token

header会被Base64Url加密组成jwt的第一部分

### Payload

Token的第二部分是负载，它包含了claim， Claim是一些实体（通常指的用户）的状态和额外的元数据，有三种类型的claim： *reserved* , *public* 和 *private* .

- Reserved claims: 这些claim是JWT预先定义的，在JWT中并不会强制使用它们，而是推荐使用，常用的有 `iss（签发者）` , `exp（过期时间戳）` , `sub（面向的用户）` , `aud（接收方）` , `iat（签发时间）`, `nbf(此时间之前不能被接收)`, `jti(jwt id为token的唯一标识)` 。
- Public claims：根据需要定义自己的字段，注意应该避免冲突
- Private claims：这些是自定义的字段，可以用来在双方之间交换信息

示例：

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

上面的payload将被Base64Url编码后组成jwt的第二部分

### Signature

创建签名需要使用编码后的header和payload以及一个秘钥secret，使用header中指定签名算法进行签名。例如如果希望使用HMAC SHA256算法，那么签名应该使用下列方式创建：

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret) 
```

签名用于验证消息的发送者以及消息是没有经过篡改的。

### 完整的JWT

JWT格式的输出是以 `.` 分隔的三段Base64编码

```
base64UrlEncode(header) + '.' + base64UrlEncode(payload) + '.' + signature
```

## 使用

在身份鉴定的实现中，传统方法是在服务端存储一个session，给客户端返回一个cookie，而使用JWT之后，当用户使用它的认证信息登陆系统之后，会返回给用户一个JWT，用户只需要本地保存该token（通常使用local storage，也可以使用cookie）即可。

当用户希望访问一个受保护的路由或者资源的时候，通常应该在 `Authorization`头部使用 `Bearer` 模式添加JWT

```
Authorization: Bearer <token>
```

因为用户的状态在服务端的内存中是不存储的，所以这是一种 **无状态** 的认证机制。服务端的保护路由将会检查请求头 `Authorization` 中的JWT信息，如果合法，则允许用户的行为。由于JWT是自包含的，因此减少了需要查询数据库的需要。

JWT的这些特性使得我们可以完全依赖其无状态的特性提供数据API服务，甚至是创建一个下载流服务。因为JWT并不使用Cookie的，所以你可以使用任何域名提供你的API服务而不需要担心跨域资源共享问题（CORS）。

## 在Nodejs中使用
### 安装
```
npm install jsonwebtoken
```

### 使用

```javascript
var jwt = require('jsonwebtoken')
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

payload 可以是一个对象，buffer或者字符串，只有当payload为对象时才能设置过期时间exp

secretOrPrivateKey是一个包含HMAC算法秘钥或者RSA和ECDSA的PEM编码私钥的字符串或buffer



生成token

```javascript
var content ={msg:"today  is  a  good  day"}； // 要生成token的主题信息
var secretOrPrivateKey="I am a goog man!" // 这是加密的key（密钥） 
var token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: 60*60*24  // 24小时过期
                })；
console.log("token ：" +token )；
```

校验token

```javascript
 var token = rq.body.token || rq.query.token || rq.headers["x-access-token"]; // 从body或query或者header中获取token
jwt.verify(token, secretOrPrivateKey, function (err, decode) {
            if (err) {  //  时间失效的时候/ 伪造的token          
               rs.json({err:err})
            } else {
                rq.decode = decode; 
                console.log(decode.msg);   // today  is  a  good  day
                next();
            }
        })
```

设置token过期时间

如果你使用expiresInMinutes来设置token的过期时间，很抱歉它会抛出如下异常

```
ValidationError: "expiresInMinutes" is not allowed
```

请使用expiresIn：以秒为单位或描述的时间跨度字符串表示[rauchg / MS](https://github.com/zeit/ms)。如：60，”2 days”，”10h”，”7d”

```javascript
{expiresIn: 60}       // 有效期60秒（没有时间单位以秒为准）
  {expiresIn: "2 days"}   // 有效期 2天 （后缀为时间单位）下面的类似
  ...... 
     ('1d')      // 86400000
     ('10h')     // 36000000
     ('2.5 hrs') // 9000000
     ('2h')      // 7200000
     ('1m')      // 60000
     ('5s')      // 5000
     ('1y')      // 31557600000
```

verify时返回的err的值

```javascript
    "err": {
    "name": "TokenExpiredError",
    "message": "jwt expired",   //  token过了有效期
    "expiredAt": "2016-11-07T03:31:25.000Z"
  }
```

```javascript
 "err": {
    "name": "JsonWebTokenError",
    "message": "invalid token"  //  伪造/无效的token
  }
```

