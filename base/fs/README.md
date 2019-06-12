# fs

`fs` 模块提供了一个 API，用于提供文件操作

所有文件操作都具有同步和异步的形式。异步的形式总是将完成回调作为其最后一个参数。

文件操作相关API

## readFile()，readFileSync()

readFile方法用于异步读取数据

```js
const fs = require('fs')
fs.readFile('./image.png', function (err, buffer) {
  if (err) throw err;
  process(buffer);
});
```
`readFile`方法的第一个参数是文件的路径，可以是绝对路径，也可以是相对路径。注意，如果是相对路径，是相对于当前进程所在的路径（`process.cwd()`），而不是相对于当前脚本所在的路径。

`readFile`方法的第二个参数是读取完成后的回调函数。该函数的第一个参数是发生错误时的错误对象，第二个参数是代表文件内容的`Buffer`实例

`readFileSync`方法用于同步读取文件， 如果指定了 `encoding` 选项，则此函数返回字符串，否则返回 `buffer`

```js
var text = fs.readFileSync(fileName, 'utf8');
```

## writeFile()，writeFileSync()

`writeFile`方法用于异步写入文件。

```js
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
```
`writeFile`方法的第一个参数是写入的文件名，第二个参数是写入的字符串，第三个参数是回调函数。

`writeFileSync`方法用于同步写入文件。

## exists(path, callback)

`exists`方法用来判断给定路径是否存在，然后不管结果如何，都会调用回调函数。

```js
fs.exists('/path/to/file', function (exists) {
  util.debug(exists ? "it's there" : "no file!");
});
```

回调函数的参数是一个表示文件是否存在的布尔值。

需要注意的是，不要在`open`方法之前调用`exists`方法，`open`方法本身就能检查文件是否存在。

## mkdir(),readdir()
`mkdir方法用于新建目录`。

`readdir`方法用于读取目录，返回一个所包含的文件和子目录的数组

```js
fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var count = files.length;
  var results = {};
  files.forEach(function (filename) {
    fs.readFile(filename, function (data) {
      results[filename] = data;
      count--;
      if (count <= 0) {
        // 对所有文件进行处理
      }
    });
  });
});
```

## stat()

`stat`方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。**我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录**

```js
var fs = require('fs');

// 读取etc目录
fs.readdir('/etc/', function (err, files) {
  if (err) throw err;

  files.forEach( function (file) {
    // 通过 stat 方法获取该路径的信息
    fs.stat('/etc/' + file, function (err, stats) {
      if (err) throw err;

      if (stats.isFile()) {
        console.log("%s is file", file);
      }
      else if (stats.isDirectory ()) {
      console.log("%s is a directory", file);
      }
    console.log('stats:  %s',JSON.stringify(stats));
    });
  });
});
```

## watchfile()，unwatchfile()
`watchfile`方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。`unwatchfile`方法用于解除对文件的监听。

```js
var fs = require('fs');

fs.watchFile('./testFile.txt', function (curr, prev) {
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});

fs.writeFile('./testFile.txt', "changed", function (err) {
  if (err) throw err;

  console.log("file write complete");   
});
```

## createReadStream()

`createReadStream`方法往往用于打开大型的文本文件，创建一个读取操作的数据流。所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个`data`事件，发送结束会触发`end`事件

```js
var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

var input = fs.createReadStream('lines.txt');
readLines(input, func);
```

## createWriteStream()

`createWriteStream`方法创建一个写入数据流对象，该对象的`write`方法用于写入数据，`end`方法用于结束写入操作

```js
var out = fs.createWriteStream(fileName, {
  encoding: 'utf8'
});
out.write(str);
out.end();
```
`createWriteStream`方法和`createReadStream`方法配合，可以实现拷贝大型文件。

```js
function fileCopy(filename1, filename2, done) {
  var input = fs.createReadStream(filename1);
  var output = fs.createWriteStream(filename2);

  input.on('data', function(d) { output.write(d); });
  input.on('error', function(err) { throw err; });
  input.on('end', function() {
    output.end();
    if (done) done();
  });
}
```
