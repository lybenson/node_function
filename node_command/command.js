#! /usr/bin/env node
var commander = require('commander');
var cmd = require('node-cmd')
var chalk = require('chalk');
var ora = require('ora');
var inquirer = require('inquirer');


// option 表示可选的命令, 第一个参数是可选命令, 第二个参数是命令解释, 同时还可以设置读取用户输入的参数
// parse(process.argv); // 将控制台得到的参数进行解析，调用相应的事件
commander
  .version('0.0.1')
  .option('-p, --prod', 'p命令的解释')
  .option('-b, --build', 'b命令的解释')
  .option('-t, --test [filename]', 't命令解释')
  .parse(process.argv);

if (commander.ppp) { // 监听--ppp或-p
  console.log('ppp命令接收到')
}
// 测试: proc -p
// 输出: ppp命令接收到

// command 在命令行增加一个命令。用户在执行此命令后，能够执行回调中的逻辑
// option 表示可选参数
// alias 命令的简写形式
// description 命令描述
// action 输入命令后执行方法
commander
  .command('init <pname> [oname...]')
  .option('-w, --watch', '监听文件变化')
  .alias('i')
  .description('init project')
  .action(function (pname, oname, command) {
    console.log(arguments.length)
    console.log(`init ${chalk.magenta(pname)} success`)
    console.log(oname)
    console.log(command.watch)

    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Loading rainbows';
      setTimeout(() => {
        spinner.succeed('loading success')
      }, 2000);
    }, 1000);

    inquirer.prompt([{
      type: 'list',
      name: 'size',
      message: 'What size do you need?',
      choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
      filter: function(val) {
        return val.toLowerCase();
        }
      }]).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
      });
  })
commander.parse(process.argv);

const spinner = ora('Loading unicorns').start();



// 测试: proc i pname_t oname_t -w
// 输出: 3  pname_t  [ 'oname_t' ]  true