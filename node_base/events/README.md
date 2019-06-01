# Events

大多数 Node.js 核心 API 构建于惯用的异步事件驱动架构，其中某些类型的对象（又称触发器，Emitter）会触发命名事件来调用函数（又称监听器，Listener）。

所有能触发事件的对象都是 EventEmitter 类的实例。 这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上。

当 EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。

如：
```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// 定义事件
myEmitter.on('event', () => {
  console.log('触发事件');
});
// 触发事件
myEmitter.emit('event');
```

eventEmitter.emit() 方法可以传任意数量的参数到监听器函数。 当监听器函数被调用时， this 关键词会被指向监听器所绑定的 EventEmitter 实例。

```javascript
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
  // 打印:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined } true
});
myEmitter.emit('event', 'a', 'b');
```

> 注：使用箭头函数时，this 不会指向 EventEmitter 实例

当注册多个相同的事件时，这些事件会按照顺序依次同步的调用。但也可以定义只注册最多可调用一次的监听器 `myEmitter.once('event', () => {})`


**错误处理**
当 EventEmitter 实例出错时，应该触发 'error' 事件。所以作为最佳实践，应该始终为 'error' 事件注册监听器。

```javascript
myEmitter.on('error', (err) => {
  console.error('错误信息');
});
myEmitter.emit('error', new Error('错误信息'));
```

# EventEmitter 类

EventEmitter 类由 events 模块定义：

```js
const EventEmitter = require('events');
```

- EventEmitter 实例在新的监听器被添加到其内部监听器数组之前，会触发自身的 'newListener' 事件。。
- 'removeListener' 事件在 listener 被移除后触发。

```js
const myEmitter = new MyEmitter();
// 只处理一次，避免无限循环。
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在前面插入一个新的监听器。
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// 打印:
//   B
//   A
```

# 相关API

- `EventEmitter.listenerCount(emitter, eventName)`:  类方法，返回在给定发射器上注册的给定eventName的监听器数

- `EventEmitter.defaultMaxListeners`: 返回默认的每个事件可注册的最多的监听器

- `emitter.addListener(eventName, listener)`: `emitter.on(eventName, listener)` 的别名， 添加 listener 函数到名为 eventName 的事件的监听器数组的末尾

- `emitter.emit(eventName[, ...args])`: 按照监听器注册的顺序，同步地调用每个注册到名为 eventName 的事件的监听器，并传入提供的参数

- `emitter.eventNames()`: 返回已注册监听器的事件名数组。 数组中的值为字符串或 Symbol。

- `emitter.listeners(eventName)`: 返回事件的监听器数组的副本

- `emitter.off(eventName, listener)`: emitter.removeListener() 的别名， 移除事件的监听器

- `emitter.once(eventName, listener)`: 添加单次监听器 listener 到名为 eventName 的事件。 当 eventName 事件下次触发时，监听器会先被移除，然后再调用。

- `emitter.prependListener(eventName, listener)`: 添加 listener 函数到名为 eventName 的事件的监听器数组的开头。

- `emitter.prependOnceListener(eventName, listener)`: 添加单次监听器 listener 到名为 eventName 的事件的监听器数组的开头。

- `emitter.removeAllListeners([eventName])`: 移除全部监听器或指定的 eventName 事件的监听器。

- `emitter.removeListener(eventName, listener)`: 从名为 eventName 的事件的监听器数组中移除指定的 listener。