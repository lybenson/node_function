// 示例3：
const assert = require('assert');
const fs = require('fs');
const child_process = require('child_process');

const subprocess = child_process.spawn('ls', {
  stdio: [
    0, // 使用父进程的 stdin 用于子进程。
    'pipe', // 把子进程的 stdout 通过管道传到父进程 。
    fs.openSync('err.out', 'w') // 把子进程的 stderr 指向一个文件。
  ]
});
console.log(subprocess);
