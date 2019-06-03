# Http

nodejs提供了http模块，用来构建服务器

```js
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000)
```

访问 `http://127.0.0.1:8080` 会返回 `hello world`



