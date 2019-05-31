/**
child_process是NodeJs的重要模块。帮助我们创建多进程任务，更好的利用了计算机的多核性能。

当然也支持线程间的通信。

异步：
1. child_process.exec(command[, options][, callback]): 衍生一个 shell 并在该 shell 中运行命令，当完成时则将 stdout 和 stderr 传给回调函数。 

2. child_process.execFile(file[, args][, options][, callback]):  类似于 child_process.exec()，不过这是执行的一个文件。除了它默认会直接衍生命令且不首先衍生 shell。

3. child_process.fork(modulePath[, args][, options]): 衍生一个新的 Node.js 进程，并通过建立 IPC 通信通道来调用指定的模块，该通道允许在父进程与子进程之间发送消息

4. child_process.spawn(command[, args][, options]): 异步地衍生子进程，且不阻塞 Node.js 事件循环

同步：
child_process.execFileSync(file[, args][, options])
child_process.execSync(command[, options])
child_process.spawnSync(command[, args][, options])

事件：
close：  当子进程的 stdio 流被关闭时触发
disconnect： 调用父进程的 subprocess.disconnect() 或子进程的 process.disconnect() 后会触发。
error：子进程出错时触发
exit：当子进程结束后时触发。
message：当子进程使用 process.send() 发送消息时触发。

options：
cwd: 子进程的当前工作目录
env: 环境变量的键值对
encoding: 字符编码
timeout: 超时时间
maxBuffer: stdout 或 stderr 允许的最大字节数。如果超过限制，则子进程会终止
killSignal: 默认值: 'SIGTERM'
uid: 设置进程的用户标
gid: 设置进程的群组标识

 */

// 展示 /usr 目录下的文件列表
const { spawn } = require('child_process');
const ls = spawn('ls', ['-la', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});