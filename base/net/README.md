# net 

`net` 模块用于创建基于流的 `TCP` 或 `IPC` 的服务器（`net.createServer()`）与客户端（`net.createConnection()`）。

`http.Server`继承了`net.Server`，此外，`http`客户端与`http`服务端的通信均依赖于`socket`（`net.Socket`）

从组成来看，`net`模块主要包含两部分

- `net.Server`：`TCP server`，内部通过`socket`来实现与客户端的通信。
- `net.Socket`：tcp/本地 `socket`的`node`版实现，它实现了全双工的stream接口

简单示例

```js

// tcp服务端程序如下：
var net = require('net');

var PORT = 3000;
var HOST = '127.0.0.1';

// tcp服务端
var server = net.createServer(function(socket){
    console.log('服务端：收到来自客户端的请求');

    socket.on('data', function(data){
        console.log('服务端：收到客户端数据，内容为{'+ data +'}');

        // 给客户端返回数据
        socket.write('你好，我是服务端');
    });

    socket.on('close', function(){
         console.log('服务端：客户端连接断开');
    });
});
server.listen(PORT, HOST, function(){
    console.log('服务端：开始监听来自客户端的请求');
});
```


```js
// tcp客户端
var net = require('net');

var PORT = 3000;
var HOST = '127.0.0.1';

// tcp客户端
var client = net.createConnection(PORT, HOST);

client.on('connect', function(){
    console.log('客户端：已经与服务端建立连接');
});

client.on('data', function(data){
    console.log('客户端：收到服务端数据，内容为{'+ data +'}');
});

client.on('close', function(data){
    console.log('客户端：连接断开');
});

client.end('你好，我是客户端');
```

# net.Server

用于创建 `TCP` 或 `IPC server`

# net.Socket

此类是 TCP 套接字或流式 IPC 端点的抽象（在 Windows 上使用命名管道，否则使用 UNIX 域套接字）。 net.Socket 也是双工流，因此它既可读也可写，也是一个 EventEmitter。

