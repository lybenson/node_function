const net = require('net');

const PORT = 3000;
const HOST = '127.0.0.1';

// tcp客户端
const client = net.createConnection(PORT, HOST);

client.on('connect', function(){
  console.log('客户端：已经与服务端建立连接');
});

client.on('data', function(data){
  console.log('客户端：收到服务端数据，内容为{'+ data +'}');
});

client.on('close', function(data){
  console.log('客户端：连接断开');
});

client.end('你好，我是客户端');