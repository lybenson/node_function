# child_process

child_process是NodeJs的重要模块。帮助我们创建多进程任务，更好的利用了计算机的多核性能。

创建子进程的方式有如下的方式，他们返回 ChildProcess 类的实例都是 EventEmitter，表示衍生的子进程。


**异步创建**：

- child_process.exec(command[, options][, callback]): 衍生一个 shell 并在该 shell 中运行命令，当完成时则将 stdout 和 stderr 传给回调函数。 

- child_process.execFile(file[, args][, options][, callback]):  类似于 child_process.exec()，不过这是执行的一个文件。除了它默认会直接衍生命令且不首先衍生 shell。

- child_process.fork(modulePath[, args][, options]): 衍生一个新的 Node.js 进程，并通过建立 IPC 通信通道来调用指定的模块，该通道允许在父进程与子进程之间发送消息

- child_process.spawn(command[, args][, options]): 异步地衍生子进程，且不阻塞 Node.js 事件循环

**同步创建**：

- child_process.execFileSync(file[, args][, options])
- child_process.execSync(command[, options])
- child_process.spawnSync(command[, args][, options])

**事件**：

- close：  当子进程的 stdio 流被关闭时触发
- disconnect： 调用父进程的 subprocess.disconnect() 或子进程的 process.disconnect() 后会触发。
- error：子进程出错时触发
- exit：当子进程结束后时触发。
- message：当子进程使用 process.send() 发送消息时触发。

**创建子进程的 options 参数**：
- cwd: 子进程的当前工作目录
- input: 将作为 stdin 传给衍生进程的值。提供此值则会覆盖 stdio[0]
- stdio: 子进程的 stdio 配置。默认情况下， stderr 将输出到父进程的 stderr，除非指定了 stdio。默认值: 'pipe'
- env: 环境变量的键值对
- uid: 设置进程的用户标
- gid: 设置进程的群组标识
- timeout: 允许进程运行的最长时间，以毫秒为单位
- killSignal: 衍生的进程将被终止时使用的信号值。默认值: 'SIGTERM'
- maxBuffer: stdout 或 stderr 允许的最大字节数。如果超过限制，则子进程会终止
- encoding: 用于所有 stdio 输入和输出的字符编码
- windowsHide: 隐藏通常在 Windows 系统上创建的子进程的控制台窗口。
- shell: 如果为 true，则在 shell 中运行 command。 在 UNIX 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec

**子进程中的流**： 见示例3

subprocess.stderr  返回子进程的 stderr 可读流。
subprocess.stdin  返回子进程的 stdin 可写流
subprocess.stdout  返回子进程的 stdout 可读流。
subprocess.stdio   一个到子进程的管道的稀疏数组， subprocess.stdio[0]、 subprocess.stdio[1] 和 subprocess.stdio[2] 分别可用作 subprocess.stdin、 subprocess.stdout 和 subprocess.stderr。
