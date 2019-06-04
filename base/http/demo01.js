const http = require('http')

http.createServer((req, res) => {
  // console.log(req.socket);

  // 支持非get
  // req.on('data', res => {
  //   console.log('get data');
    
  //   res.writeHead(200);
  //   res.end('hello world\n');
  // })
  res.end('hello world\n');
}).listen(8000)

