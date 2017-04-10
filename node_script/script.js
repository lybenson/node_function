#!/usr/bin/env node

var options = process.argv.slice(2);

if (options[0] === '-v') {
	console.log('v1.0.0')
} else {
	console.log('unknown commander:', options[0]);
}

//命令行工具commander.js
//minimist.js