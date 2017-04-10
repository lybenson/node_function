#!/usr/bin/env node

var fs = require('fs');

//process.argv 命令参数转成数组[]
var args = require('minimist')(process.argv.slice(2));

console.log(args);

if (args.v || args.version) {
	console.log('\033[34m\033[47mv\033[35m1.0.0\033[0m');
} else if (args.h || args.help) {
	fs.createReadStream('./usage.txt').pipe(process.stdout);
} else {
	console.log('-bash:' + args + ': command not found');
}