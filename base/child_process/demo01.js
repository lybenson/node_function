// 示例1： 展示 /usr 目录下的文件列表
const { spawn } = require('child_process');
const ls = spawn('ls', ['-la', '/usr']); //创建子进程, 返回ChildProcess的实例
console.log(ls);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
