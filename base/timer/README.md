# timer

`timer` 模块暴露了一个全局的 API，用于预定在将来某个时间段调用的函数

`Node.js` 中的定时器函数实现了与 Web 浏览器提供的定时器 API 类似的 API，但是使用了不同的内部实现（基于 `Node.js` 事件循环构建）

# Immediate 类

该类的实例由 并从 `setImmediate()` 创建并返回，返回的 `Immediate` 对象导出 `immediate.ref()` 和 `immediate.unref()` 函数，这些函数可用于控制此默认行为。

- `immediate.unref()` 调用时，活动的 `Immediate` 对象不需要 `Node.js `事件循环保持活动状态。 如果没有其他活动保持事件循环运行，则进程可以在调用 `Immediate` 对象的回调之前退出。 多次调用 `immediate.unref()` 将无效。

- `immediate.ref()`  调用时，只要 `Immediate` 处于活动状态，就会请求 `Node.js` 事件循环不会退出。

通过 `setImmediate(callback[, ...args])` 创建一个预定在 I/O 事件的回调之后立即执行的 `callback`。

```js
setImmediate((name) => {
  console.log(name)
}, 'benson')
```

# Timeout 类

此对象在内部创建，并从 `setTimeout()` 和 `setInterval()` 返回。 它可以传给 `clearTimeout()` 或 `clearInterval()` 以取消计划的操作。

默认情况下，当使用 `setTimeout()` 或 `setInterval()` 预定定时器时，只要定时器处于活动状态，`Node.js` 事件循环将继续运行

- `setInterval(callback, delay[, ...args])`
- `setTimeout(callback, delay[, ...args])`
