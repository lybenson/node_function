const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// 定义事件
myEmitter.on('event', () => {
  console.log('触发事件1');
});
myEmitter.on('event', () => {
  console.log('触发事件2');
});


myEmitter.on('error', (err) => {
  console.error(err);
});

myEmitter.emit('error', new Error('错误信息'));

// 触发事件
// myEmitter.emit('event');

console.log(myEmitter.listeners('event'))