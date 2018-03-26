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
