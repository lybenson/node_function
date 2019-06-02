# Process

`process`存在于全局对象上，不需要使用`require()`加载即可使用，`process`模块主要做两方面的事情

- 获取进程信息（资源使用、运行环境、运行状态）
- 执行进程操作（监听事件、调度任务、发出警告）

# 事件

`process`是`EventEmiiter`的实例对象，因此可以使用`process.on('eventName', () => {})`来监听事件。 常用的事件类型分两种：

- 普通事件: `beforeExit`、`exit`、`uncaughtException`、`message`
- 信号事件: `SIGTERM`、`SIGKILL`、`SIGUSR1`

### 普通事件

`beforeExit`里面可以执行异步代码、`exit`只能是同步代码。手动调用`process.exit()`或者触发`uncaptException`导致进程退出不会触发`beforeExit`事件、`exit`事件会触发。

当异常一直没有被捕获处理的话，最后就会触发`uncaughtException`事件。默认情况下，Node.js会打印堆栈信息到`stderr`然后退出进程。不要试图阻止`uncaughtException`退出进程，因此此时程序的状态可能已经不稳定了，建议的方式是及时捕获处理代码中的错误，`uncaughtException`里面只做一些清理工作。


> 注意：node的9.3版本增加了`process.setUncaughtExceptionCaptureCallback`方法, 当`process.setUncaughtExceptionCaptureCallback(fn)`指定了监听函数的时候，`uncaughtException`事件将会不再被触发

```js
process.on('uncaughtException', function() {
  console.log('uncaught listener');
});

process.setUncaughtExceptionCaptureCallback(function() {
  console.log('uncaught fn');
});

a.b();
// uncaught fn
```

message适用于父子进程之间发送消息，

### 信号事件

当Node.js进程接收到一个信号时，会触发信号事件

- `SIGUSR1` 被Node.js保留用于启动调试器。可以为此事件绑定一个监听器，但是即使这样做也不会阻止调试器的启动。
- `SIGTERM` 和 `SIGINT` 在非windows平台绑定了默认的监听器，这样进程以代码128 + signal number结束之前，可以重置终端模式。  
- `SIGPIPE` 默认会被忽略。可以给其绑定监听器。
- `SIGHUP` 在Windows平台中当console窗口被关闭时会触发它，在非windows平台中多种相似的条件下也会触发
- `SIGTERM` 在Windows中不支持，可以给其绑定监听器。
- `SIGINT` 在终端运行时，可以被所有平台支持，通常可以通过 <Ctrl>+C 触发(虽然这个不能配置)。 当终端运行在raw模式，它不会被触发。
- `SIGBREAK` 在Windows中按下<Ctrl>+<Break>会被触发，非Windows平台中可以为其绑定监听器，但是没有方式触发或发送此事件。
- `SIGWINCH` 当console被resize时会触发。Windows中只有当光标移动并写入到console，或者以raw模式使用一个可读tty时，才会触发。
- `SIGKILL` 不能绑定监听器，所有平台中出现此事件，都会使得Node.js无条件终止。
- `SIGSTOP` 不能绑定监听器。

`SIGTERM`信号虽然也是用于请求终止Node.js进程，但是它与`SIGKILL`有所不同，进程可以选择响应还是忽略此信号。 `SIGTERM`会以一种友好的方式来结束进程，在进程结束之前先释放已分配的资源（比如数据库连接）,因此这种方式被称为优雅关闭(graceful shutdown) 具体的执行步骤如下：

- 应用程序被通知需要关闭（接收到SIGTERM信号）
- 应用程序通知负载均衡不再接收新的请求
- 应用程序完成正在进行中的请求
- 释放资源（例如数据库连接）
- 应用程序正常退出，退出状态码为0

# 属性

- `process.arch` process.arch属性返回一个表示操作系统CPU架构的字符串
- `process.argv` 返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数
- `process.argv0` 保存当 Node.js 启动时传入的 argv[0] 的原始值的只读副本
- `process.channel`  如果Node.js进程是由IPC channel方式创建的， process.channel属性保存IPC channel的引用
- `process.chdir(directory)`  变更Node.js进程的当前工作目录，如果变更目录失败会抛出异常
- `process.config`  返回一个Javascript对象。此对象描述了用于编译当前Node.js执行程序时涉及的配置项信息
- `process.connected`  IPC channel保持连接，返回true。 
- `process.disconnect()` IPC channel断开连接，返回true。 
- `process.cpuUsage([previousValue])` 返回包含当前进程的用户CPU时间和系统CPU时间的对象
- `process.cwd()` 返回 Node.js 进程的当前工作目录。
- `process.debugPort`  debugger 调试器使用的端口。


- `process.emitWarning(warning[, options])` 用于发出定制的或应用特定的进程警告。 可以通过给process.on('warning')事件增加处理器，监听这些警告。

- `process.env`  返回包含用户环境的对象
- `process.uptime()` 方法返回当前 Node.js 进程运行时间秒长

# 调度任务

通过`process.nextTick`调度的任务是异步任务, `EventLoop`是分阶段的，每个阶段执行特定的任务，而`nextTick`的任务在阶段切换的时候就会执行。

`process.nextTick`方法将 callback 添加到下一个时间点的队列。 一旦当轮的事件循环全部完成，则调用下一个时间点的队列中的所有回调。

相对于 `setTimeout(fn, 0)` 它的效率更高。 它会在事件循环的下一个时间点中触发任何其他 I/O 事件（包括定时器）之前运行。

```js
function MyThing(options) {
  this.setupOptions(options);

  process.nextTick(() => {
    this.startDoingStuff();
  });
}

const thing = new MyThing();
thing.getReadyForStuff();

// thing.startDoingStuff() 现在被调用，而不是在之前。
```


# 进程I/O

`process.stdout` 和 `process.stderr` 与 Node.js 中其他 streams 的不同:

- `console.log()` 和 `console.error()` 内部分别是由它们实现的。
- 不能被关闭
- 永远不会触发 `finish` 事件。
- 写操作是否为同步，取决于连接的是什么流以及操作系统是 Windows 还是 POSIX


# 异常退出码

正常情况下，如果没有异步操作正在等待，那么Node.js会以状态码0退出，其他情况下，会用如下的状态码:

- 1 - 未捕获异常: 有一个未被捕获的异常, 并且没被一个 `domain` 或 `uncaughtException` 事件处理器处理

- 2 - 未被使用 (Bash为防内部滥用而保留)

- 3 -  内部JavaScript 分析错误

- 4 - 内部JavaScript执行失败

- 5 -  致命错误 - 在V8中有一个致命的错误

- 6 - 非函数的内部异常处理，发生了一个内部异常，但是内部异常处理函数 被设置成了一个非函数，或者不能被调用。

- 7 - 内部异常处理运行时失败， 有一个不能被捕获的异常。 在试图处理这个异常时，处理函数本身抛出了一个错误。

- 8 - 未被使用

- 9 - 不可用参数 - 也许是某个未知选项没有确定，或者没给必需要的选项填值

- 10 - 内部JavaScript运行时失败 - 调用引导函数时， 引导进程执行Node.js的内部的JavaScript源代码抛出错误

- 12 - 不可用的调试参数 - --inspect 和/或 --inspect-brk 选项已设置，但选择的端口号无效或不可用。

- \>128 退出信号 - 如果Node.js的接收信号致命诸如 SIGKILL 或 SIGHUP，那么它的退出代码将是 128 加上信号的码值

