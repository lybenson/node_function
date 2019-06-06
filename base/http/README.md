# Http

nodejs提供了http模块，用来构建服务器

```js
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000)
```
`ceateServer`方法接受一个函数作为参数，该函数的`request`参数是一个对象，表示客户端的HTTP请求；`response`参数也是一个对象，表示服务器端的HTTP回应。`response.writeHead`方法用来写入HTTP回应的头信息；`response.end`方法用来写入HTTP回应的具体内容，以及回应完成后关闭本次对话。最后的`listen(8080)`表示启动服务器实例，监听本机的8080端口。

访问 `http://127.0.0.1:8080` 会返回 `hello world`


是根据不同网址的请求，显示不同的内容

```js
const http = require('http');

http.createServer((req, res) => {

  // 主页
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the homepage!");
  }

  // About页面
  else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the about page!");
  }

  // 404错误
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 error! File not found.");
  }

}).listen(8080, "localhost");
```

# http.Server 类


使用`createServer`方法返回了一个`http.Server`对象，这其实是一个创建http服务的捷径，等同于下面的方式

```js
const http = require('http');
const server = new http.Server()

server.on('request', (req, res) => {
  res.end();
})

server.listent(3000)
```

以上代码是通过直接创建一个`http.Server`对象，然后为其添加`request`事件监听，其实也就说`createServer`方法其实本质上也是为`http.Server`对象添加了一个`request`事件监听

### http.Server 的事件

`http.Server`是一个基于事件的服务器，她是继承自`EventEmitter`，事实上，nodejs中大部分模块都继承自`EventEmitter`，包括`fs`、`net`等模块，这也是为什么说`nodejs`基于事件驱动.http.Server提供的事件如下

- `request`  当客户端请求到来时，该事件被触发，提供两个参数req和res，表示请求和响应信息

- `connection`  当TCP连接建立时，该事件被触发，提供一个参数`socket`，是`net.Socket`的实例

- `close`  当服务器关闭时，触发事件

- `upgrade`  每次客户端请求 HTTP 升级时发出。 监听此事件. 例如，`websocket`

- `clientError` 如果客户端连接触发 'error' 事件，则会在此处转发

- `checkExpectation`  每次收到带有 `HTTP Expect` 请求头的请求时触发


# http.IncomingMessage

`IncomingMessage` 对象由 `http.Server` 或 `http.ClientRequest` 创建，并分别作为第一个参数传给 'request' 和 'response' 事件。 它可用于访问响应状态、消息头、以及数据。

`ceateServer`方法接受一个函数作为参数，该函数的`request`参数就是`IncomingMessage`的实例

`http.IncomingMessage` 实现了可读流接口，还有以下额外的事件

- `aborted`  当请求中止时触发。
- `close`  用户当前请求结束时，该事件被触发，不同于end，如果用户强制终止了传输，也是用close
- `data`  当请求体数据到来时，该事件被触发，该事件提供一个参数chunk，表示接受的数据，如果该事件没有被监听，则请求体会被抛弃，该事件可能会被调用多次（这与nodejs是异步的有关系）
- `end` 当请求体数据传输完毕时，该事件会被触发，此后不会再有数据

`http.IncomingMessage` 属性如下

- `complete`  如果已收到并成功解析完整的 `HTTP` 消息，则 `message.complete` 属性将为 `true`。
- `httpVersion`  `HTTP` 版本
- `method`
- `url`
- `headers`  请求头
- `socket`  与连接关联的 `net.Socket` 对象。
- `statusCode`
- `statusMessage`

# http.ServerResponse 类 

`ceateServer`方法接受一个函数作为参数，该函数的`response`参数就是`ServerResponse`的实例, 此对象由 HTTP 服务器在内部创建，而不是由用户创建,  它作为第二个参数传给 Server的 'request' 事件。决定了用户最终看到的内容。


提供以下事件

- `close`  表明在调用 `response.end()` 或能够刷新之前终止了底层连接。
- `finish`  响应发送后触发

ServerResponse有三个重要的成员函数，用于返回响应头、响应内容以及结束请求

- `response.writeHead(statusCode[, statusMessage][, headers])`  向请求发送响应头, 状态码是一个 3 位的 HTTP 状态码
- `response.write(chunk[, encoding][, callback])`  发送响应内内容
- `response.end([data][, encoding][, callback])`  此方法向服务器发出信号，表明已发送所有响应头和主体，该服务器应该视为此消息已完成。 如果指定了 data，则相当于调用 `response.write(data, encoding)` 之后再调用 `response.end(callback)`。

# HTTP 客户端

`http`模块提供了两个函数`http.request`和`http.get`，功能是作为客户端向`http`服务器发起请求。

```js
const http = require('http')
http.get({
  host: '127.0.0.1',
  port: 8000,
  path: '/'
}, function(response) {
  let body = '';
  response.on('data', function(d) {
    body += d;
  });

  response.on('end', function() {
    var parsed = JSON.parse(body);
    callback({
      email: parsed.email,
      password: parsed.pass
    });
  });
});

// or 
http.request(options[, callback])
```

`http.request`和`http.get` 返回的都是 http.ClientRequest 类的实例，表示一个已经产生而且正在进行中的HTTP请求，提供一个response事件，也就是我们使用http.get和http.request方法中的回调函数所绑定的对象，我们可以显式地绑定这个事件的监听函数


http.ClientRequest也提供了write和end函数，用于向服务器发送请求体，通常用于POST、PUT等操作，所有写操作都必须调用end函数来通知服务器，否则请求无效。此外，这个对象还提供了abort()、setTimeout()等方法

```js
const http = require('http')

let options = {
  hostname: '127.0.0.1',
  port: 8000
}
let clientReq = http.request(options)
clientReq.on('response', res => {
  res.on('data', chunk => {
    console.log(chunk.toString())
  })
  console.log(res.statusCode)
})

clientReq.on('error', err => {
  console.log(err.message)
})
clientReq.end()
```

接收以下事件

- `abort`  当请求被客户端中止时触发。
- `connect`  每次服务器使用 CONNECT 方法响应请求时都会触发
- `continue`  当服务器发送 100 Continue HTTP 响应时触发
- `information`  服务器发送 1xx 响应时触发（不包括 101 Upgrade）
- `response`  当收到此请求的响应时触发。 此事件仅触发一次。
- `socket`  将套接字分配给此请求后触发
- `timeout`  当底层套接字因不活动而超时时触发。 这只会通知套接字已空闲。
- `upgrade`  每次服务器响应升级请求时发出。


# http.Agent

// TODO