const cluster = require('cluster');

// 如果当前是主进程，则创建一个子进程并向子进程发送消息
// 如果当前是子进程，监听主进程发送的消息，并向主进程发送消息
if (cluster.isMaster) {
  console.log('主进程');
  
  var worker = cluster.fork();
  worker.send('hi there');
} else if (cluster.isWorker) {
  process.on('message', function(msg) {
    process.send(msg);
  });
}