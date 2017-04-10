var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// console.log(io)
io.on('connection', function(socket){
  console.log(socket);
  // socket.broadcast.emit('hi'); //广播,用于向其他人发送消息,不包括发送者
  socket.on('disconnect', function(){
    // console.log('user disconnected');
  });

  // 客户端触发事件'chat message',服务端在此处接收'chat message'
  socket.on('chat message', function(msg){
    console.log(socket.id)
    // emit发送'chat message'事件给每个用户,包括发送者,客户端绑定事件'chat message'作为接收端
    io.emit('chat message', msg); 
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});