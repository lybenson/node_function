# debugger

`Node.js` 包括一个进程外的调试实用程序，可通过V8检查器和内置调试客户端访问。 要使用它，请使用 `inspect` 参数启动 `Node.js`，然后使用要调试的脚本的路径。 将显示一个提示，表明调试器成功启动：

```shell
$ node inspect myscript.js
```

将 `debugger;` 语句插入到脚本的源代码，将在代码中的该位置启用断点：

```js
setTimeout(() => {
  debugger;
  console.log('setTimeout');
}, 1000);
```

### 使用的命令
- cont, c 继续执行
- next, n 下一步
- step, s 步进
- out, o 步出
- pause 暂停运行
