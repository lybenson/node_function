#! /usr/bin/env node
var commander = require('commander');
 
commander
  .version('0.0.1')
  .option('-p, --ppp', 'p命令的解释')
  .option('-b, --bbb', 'b命令的解释')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);
 

console.log(commander)

if (commander.p) {
  console.log('23333')
}

// option 表示可选的命令, 第一个参数是可选命令, 第二个参数是命令解释
// parse(process.argv); // 将控制台得到的参数进行解析，调用相应的事件
