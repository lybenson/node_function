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


### http.IncomingMessage

`IncomingMessage` 对象由 `http.Server` 或 `http.ClientRequest` 创建，并分别作为第一个参数传给 'request' 和 'response' 事件。 它可用于访问响应状态、消息头、以及数据。

`ceateServer`方法接受一个函数作为参数，该函数的`request`参数就是`IncomingMessage`的实例

`http.IncomingMessage` 实现了可读流接口，还有以下额外的事件

- aborted  当请求中止时触发。
- close  用户当前请求结束时，该事件被触发，不同于end，如果用户强制终止了传输，也是用close
- data  当请求体数据到来时，该事件被触发，该事件提供一个参数chunk，表示接受的数据，如果该事件没有被监听，则请求体会被抛弃，该事件可能会被调用多次（这与nodejs是异步的有关系）
- end  当请求体数据传输完毕时，该事件会被触发，此后不会再有数据

