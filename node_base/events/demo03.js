const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// 事件为 Symbol 类型
const symbol = Symbol('symbol');

myEmitter.on(symbol, () => {
  console.log('A');
});

myEmitter.emit(symbol)
