# Cluster

单个 Node.js 实例运行在单个线程中。 为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。

如采用下列方式启动服务，会提示端口占用

```js
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);

// 启动第一个服务 node index.js
// 启动第二个服务 node index.js  #  Error: listen EADDRINUSE :::8000
```

但如果使用 Cluster 则不会出错

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```
上面代码先判断当前进程是否为主进程（cluster.isMaster），如果是的，就按照CPU的核数，新建若干个worker进程；如果不是，说明当前进程是worker进程，则在该进程启动一个服务器程序。

上面这段代码有一个缺点，就是一旦work进程挂了，主进程无法知道。为了解决这个问题，可以在主进程部署online事件和exit事件的监听函数。

```js
var cluster = require('cluster');

if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
}
```
上面代码中，主进程一旦监听到worker进程的exit事件，就会重启一个worker进程。worker进程一旦启动成功，可以正常运行了，就会发出online事件。

# worker对象

worker对象是 `cluster.fork()`的返回值，代表一个worker进程。

属性和方法：

- `worker.id` 当前worker进程编号
- `worker.process`： 所有的`worker`进程都是用`child_process.fork()`生成的。`child_process.fork()`返回的对象，就被保存在`worker.process`之中。通过这个属性，可以获取`worker`所在的进程对象。
- `worker.send()`: 该方法用于在主进程中，向子进程发送信息

  ```js
  if (cluster.isMaster) {
    // 创建子进程，并向子进程发送消息, worker表示消息接收者
    var worker = cluster.fork();
    worker.send('hi there');
  } else if (cluster.isWorker) {
    // 在worker进程中，要向主进程发送消息，使用process.send(message)
    process.on('message', function(msg) {
      process.send(msg);
    });
  }
  ```

# cluster.workers

该对象只有主进程才有，包含了所有worker进程。每个成员的键值就是一个worker进程对象，键名就是该worker进程的worker.id属性。

```js
// 遍历所有的worker进程
function eachWorker(callback) {
  for (var id in cluster.workers) {
    callback(cluster.workers[id]);
  }
}
eachWorker(function(worker) {
  worker.send('big announcement to all workers');
});
```

# Cluster 模块的属性和方法

- `isMaster, isWorker`
- `fork()`: 新建一个`worker`进程，上下文都复制主进程
- `kill()`:  终止`worker`进程
- `listening`事件: `worker`进程调用`listening`方法以后，“`listening`”事件就传向该进程的服务器，然后传向主进程。该事件的回调函数接受两个参数，一个是当前`worker`对象，另一个是地址对象，包含网址、端口、地址类型（IPv4、IPv6、Unix socket、UDP）等信息。这对于那些服务多个网址的Node应用程序非常有用。

  ```js
  cluster.on('listening', function (worker, address) {
    console.log("A worker is now connected to " + address.address + ":" + address.port);
  });
  ```

# 不中断重启Node服务

重启服务需要关闭后再启动，利用`cluster`模块，可以做到先启动一个`worker`进程，再把原有的所有`worker`进程关闭。这样就能实现不中断地重启Node服务。

1. 首先，主进程向`worker`进程发出重启信号。

```js
workers[wid].send({type: 'shutdown', from: 'master'});
```

2. worker进程监听message事件，一旦发现内容是shutdown，就退出。

```js
process.on('message', function(message) {
  if(message.type === 'shutdown') {
    process.exit(0);
  }
});
```

关闭所有`worker`进程

```js
function restartWorkers() {
  var wid, workerIds = [];
  for(wid in cluster.workers) {
    workerIds.push(wid);
  }

  workerIds.forEach(function(wid) {
    cluster.workers[wid].send({
      text: 'shutdown',
      from: 'master'
     });
    setTimeout(function() {
      if(cluster.workers[wid]) {
        cluster.workers[wid].kill('SIGKILL');
      }
    }, 5000);
  });
};
```

# 完整代码

主进程
```js
var cluster = require('cluster');

console.log('started master with ' + process.pid);

// 新建一个worker进程
cluster.fork();

process.on('SIGHUP', function () {
  console.log('Reloading...');
  var new_worker = cluster.fork();
  new_worker.once('listening', function () {
    // 关闭所有其他worker进程
    for(var id in cluster.workers) {
      if (id === new_worker.id.toString()) continue;
      cluster.workers[id].kill('SIGTERM');
    }
  });
});
```
主进程监听`SIGHUP`事件，如果发生该事件就关闭其他所有`worker`进程。之所以是`SIGHUP`事件，是因为`nginx`服务器监听到这个信号，会创造一个新的`worker`进程，重新加载配置文件。另外，关闭`worker`进程时，主进程发送`SIGTERM`信号，这是因为`Node`允许多`个worker`进程监听同一个端口。


`worker`进程的代码server.js

```js
var cluster = require('cluster');

if (cluster.isMaster) {
  require('./master');
  return;
}

var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
  res.send('ha fsdgfds gfds gfd!');
});

http.createServer(app).listen(8080, function () {
  console.log('http://localhost:8080');
});
```
使用如下

```shell
$ node server.js
started master with 10538
http://localhost:8080
```
之后，向主进程连续发出两次SIGHUP信号。

```shell
$ kill -SIGHUP 10538
$ kill -SIGHUP 10538
```

主进程会连续两次新建一个`worker`进程，然后关闭所有其他`worker`进程。

最后，向主进程发出SIGTERM信号，关闭主进程。

```shell
$ kill 10538
```

# PM2模块

PM2模块是`cluster`模块的一个包装层。它的作用是尽量将`cluster`模块抽象掉，让用户像使用单进程一样，部署多进程Node应用。

```js
// app.js
// app.js
var http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("hello world");
}).listen(8080);
```

使用pm2启动

```shell
$ pm2 start app.js -i 4
```
`i`参数告诉`PM2`，这段代码应该在`cluster_mode`启动，且新建`worker`进程的数量是4个。如果`i`参数的值是0，那么当前机器有几个`CPU`内核，`PM2`就会启动几个`worker`进程。

如果一个`worker`进程由于某种原因挂掉了，会立刻重启该`worker`进程。

```shell
# 重启所有worker进程
$ pm2 reload all
```

每个worker进程都有一个id，可以用下面的命令查看单个worker进程的详情。

```shell
$ pm2 show <worker id>
```

正确情况下，PM2采用fork模式新建worker进程，即主进程fork自身，产生一个worker进程。pm2 reload命令则会用spawn方式启动，即一个接一个启动worker进程，一个新的worker启动成功，再杀死一个旧的worker进程。采用这种方式，重新部署新版本时，服务器就不会中断服务。

```shell
$ pm2 reload <脚本文件名>
````

关闭worker进程的时候，可以部署下面的代码，让worker进程监听shutdown消息。一旦收到这个消息，进行完毕收尾清理工作再关闭。

```js
process.on('message', function(msg) {
  if (msg === 'shutdown') {
    close_all_connections();
    delete_logs();
    server.close();
    process.exit(0);
  }
});
```




