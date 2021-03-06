// 示例2：发送socket对象

const { fork } = require('child_process');
const path = require('path')
const process = path.resolve(__dirname, 'node_base/child_process/subprocess.js')

const normal = fork(process, ['normal']);
const special = fork(process, ['special']);

// 开启 server，并发送 socket 给子进程。
// 使用 `pauseOnConnect` 防止 socket 在被发送到子进程之前被读取。
const server = require('net').createServer({ pauseOnConnect: true });
server.on('connection', (socket) => {

  // 特殊优先级。
  if (socket.remoteAddress === '74.125.127.100') {
    special.send('socket', socket);
    return;
  }
  // 普通优先级。
  normal.send('socket', socket);
});
server.listen(1337);
