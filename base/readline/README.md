# readline

`readline` 模块提供了一个接口，用于一次一行地读取可读流（例如 `process.stdin`）中的数据。 它可以使用以下方式访问：

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('你如何看待 Node.js 中文网？', (answer) => {
  // TODO：将答案记录在数据库中。
  console.log(`感谢您的宝贵意见：${answer}`);

  rl.close();
});
````

# Interface 类

`readline.Interface` 类的实例是使用 `readline.createInterface()` 方法构造的。 每个实例都关联一个 `input` 可读流和一个 `output` 可写流。 `output` 流用于为到达的用户输入打印提示，并从 `input` 流读取。

事件：

- `close` 监听 `close` 事件

- `line` 每当 input 流接收到行尾输入（`\n、 \r 或 \r\n`）时就会触发 `line` 事件

- `pause` 监听 `pause` 事件，当`input`流被暂停，或`input`流未暂停且接收到`SIGCONT`事件

- `resume`  当 `input` 流恢复时，就会触发 `resume` 事件

- `SIGCONT`  当先前使用 `<ctrl>-Z`（即 `SIGTSTP`）移入后台的 `Node.js` 进程使用 `fg(1p)` 返回到前台时，就会触发 `SIGCONT` 事件。

- `SIGINT`  每当 `input` 流接收到 `<ctrl>-C` 输入（通常称为 `SIGINT`）时，就会触发 `SIGINT` 事件, 表示退出

- `SIGTSTP`  每当 `input` 流接收到 `<ctrl>-Z` 输入（通常称为 `SIGTSTP`）时，就会触发 `SIGTSTP` 事件。 如果当 input 流接收到 `SIGTSTP` 时没有注册 `SIGTSTP` 事件监听器，则 `Node.js` 进程将被发送到后台。

方法：

- `rl.close()` 关闭 `readline.Interface` 实例，并放弃对 `input` 和 `output` 流的控制

- `rl.pause()` 会暂停 `input` 流

- `rl.prompt([preserveCursor])`  将 `readline.Interface` 实例配置的提示写入 `output` 中的新一行，以便为用户提供一个可供输入的新位置。

- `rl.question(query, callback)` 通过将 `query` 写入 `output` 来显示它，并等待用户在 `input` 上提供输入，然后调用 `callback` 函数将提供的输入作为第一个参数传入。

- `rl.resume()` 恢复 `input` 流

- `rl.write(data[, key])`  将 `data` 或 `key` 标识的按键序列写入 `output`



