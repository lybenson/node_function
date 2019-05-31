## Events

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
