// subprocess.js 会接收到一个 socket 句柄，并作为第二个参数传给事件回调函数：
// 一旦一个 socket 已被传给了子进程，则父进程不再能够跟踪 socket 何时被销毁
process.on('message', (m, server) => {
  if (m === 'server') {
    server.on('connection', (socket) => {
      socket.end('被子进程处理');
    });
  }
});
