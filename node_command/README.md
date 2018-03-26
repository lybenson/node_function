node.js命令行程序主要依赖于commander.js

文件开头需要声明文件执行所在的环境

```
#! /usr/bin/env node 
```

同时需要在package.json中加上bin字段, 用以定义命令名称和所要执行的js文件路径

```
"bin": {
  "proc": "command.js"
}
```

之后执行`npm link`, 将npm包软链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该npm包


脚本示例可查看command.js文件

`node-cmd`提供了对shell脚本的支持, 执行`npm install node-cmd`即可安装

```
var cmd=require('node-cmd');

cmd.get(
  'pwd',
  function(err, data, stderr){
      console.log('the current working dir is : ', data)
  }
);
cmd.run('touch example.created.file');
  cmd.get(
    `
      git clone https://github.com/RIAEvangelist/node-cmd.git
      cd node-cmd
      ls
    `,
    function(err, data, stderr){
      if (!err) {
          console.log('the node-cmd cloned dir contains these files :\n\n',data)
      } else {
          console.log('error', err)
      }
    }
  );
```


`chalk`是一个日志的样式库，可以在终端上面调整日志的样式，支持文字颜色和背景颜色

```
const chalk = require('chalk');

console.log(chalk.red('hello world'));
```

更多的颜色可以通过其github查看


`ora`是一个终端实现Loading的效果
```
const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```

实例方法

- start([text])
- stop()
- succeed([text])
- fail([text])
- warn([text])
- info([text])
- stopAndPersist([options])
- clear()
- render()
- frame()

实例属性

- text: 改变字体
- color: 改变Loading颜色


`inquirer` 实现终端与用户交互, 如选择文件类型等

```
var inquirer = require('inquirer');
inquirer.prompt([{type: 'confirm', name: 'OK', message: 'Are you OK?', default: false}]).then(answers => {
    console.log(answers);
});
```

type 取值有

- list: 选择列表中一项
- rawlist: 选择列表中一项
- expand
- checkbox: 多选
- confirm: yes or no
- input: 手动输入, 可正则校验
- password: 输入密码, 星号
- editor

