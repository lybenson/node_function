# Domain

`domain` 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的异常.且不会丢失上下文，也不会导致程序退出。

`domain` 模块提供了一种将多个不同IO操作作为单个组处理的方法， 如果注册到 domain 的任何事件触发器或回调发出“error”事件或抛出错误，则将通知 domain 对象，而不是在 `process.on('uncaughtException')`处理程序中丢失错误的上下文，或导致程序立即退出并显示错误代码

**错误对象**
当通过domain去定位错误时，一些额外的字段将会添加到error对象中

- error.domain
- error.domainEmitter
- error.domainBound
- error.domainThrown

**绑定方式**

`Domain` 模块可分为隐式绑定和显式绑定：
- 隐式绑定: 如果正在使用`domain`，则所有新的`EventEmitter`对象（包括Stream对象，请求，响应等）将在创建时隐式绑定到使用的domain上。隐式绑定路由将“错误”事件抛出到domain的“ `error` ”事件

- 显式绑定: 有时，使用的domain不是应该用于特定事件发射器。或者，事件发射器可能是在一个 domain 的上下文中创建的，但应该绑定到某个其他 domain。 如：一个域用于HTTP服务器，但也许我们希望有一个单独的域用于每个请求。

```js
// create a top-level domain for the server
const domain = require('domain');
const http = require('http');
const serverDomain = domain.create();

serverDomain.run(() => {
  // server is created in the scope of serverDomain
  http.createServer((req, res) => {
    // req and res are also created in the scope of serverDomain
    // however, we'd prefer to have a separate domain for each request.
    // create it first thing, and add req and res to it.
    const reqd = domain.create();
    reqd.add(req);
    reqd.add(res);
    reqd.on('error', (er) => {
      console.error('Error', er, req.url);
      try {
        res.writeHead(500);
        res.end('Error occurred, sorry.');
      } catch (er2) {
        console.error('Error sending 500', er2, req.url);
      }
    });
  }).listen(1337);
});
```

**Domain 类**

Domain类将路由错误和未捕获的异常的功能封装到活动的Domain对象

Domain是EventEmitter的子类。要处理它捕获的错误，请监听其“error”事件。

**方法**

- `domain.create()`: 创建domain对象
- `domain.run(function)`: 在domain的上下文运行提供的函数
- `domain.add(emitter)`: 显式的增加事件触发器
- `domain.remove(emitter)`: 删除事件触发器
- `domain.bind(callback)`: 返回的函数是一个对于所提供的回调函数的包装函数 （见demo2.js）
-	`domain.intercept(callback)`: 
- `domain.enter()`: 进入一个异步调用的上下文，绑定到domain
- `domain.exit()`: 退出当前的domain，切换到不同的链的异步调用的上下文中
- `domain.dispose()`: 释放一个domain对象，让node进程回收这部分资源。

**promise和domain**

从Node 8.0.0开始，Promises的处理程序在调用.then或.catch内部的 domain 运行

```js
const d1 = domain.create();
const d2 = domain.create();

let p;
d1.run(() => {
  p = Promise.resolve(42);
});

d2.run(() => {
  p.then((v) => {
    // running in d2
  });
});
```
上面的promise运行在其本身的 domain 中，但可以使用 `domain.bind(callback)` 绑定到特定domain

