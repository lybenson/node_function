var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
  port: 8888, //监听接口  
  verifyClient: socketVerify //可选，验证连接函数  
});

setInterval(function () {
  wss.broadcast(1, { name: '管理员', msg: Math.random() * 100 });
}, 3000);


function socketVerify(info) {
  // info字段：
  // origin [String]由客户端指示的Origin标头中的值
  // req [http.IncomingMessage]http请求
  // secure [boolean]如果req.connection.authorized或req.connection.encrypted设置为true
  console.log('socketVerify');
  return true;
}

//广播
wss.broadcast = function broadcast(s, ws) {
  console.log('broadcast');
  // console.log(ws);  
  // debugger;  
  wss.clients.forEach(function each(client) {
    // if (typeof client.user != "undefined") {  
    if (s == 1) {
      client.send(ws.name + ":" + ws.msg);
    }
    if (s == 0) {
      client.send(ws + "退出");
    }
    // }  
  });
};

// 事件
// connection
// message
// error
// close

// 初始化   connection表示和客户端连接打开
wss.on('connection', function (ws, req) {
  var ip = req.connection.remoteAddress;
  console.log(ip);
  // console.log(ws.clients.session);  
  // console.log("在线人数", wss.clients.length);  
  // ws.send('你是第' + wss.clients.length + '位');

  // message表示收到客户端的消息  
  ws.on('message', function (data) {
    console.log(data)
    // 广播信息
    wss.broadcast(1, { name: 'jonny', msg: '大家好' });

  });

  // close 关闭连接 
  ws.on('close', function (close) {
    try {
      wss.broadcast(0, this.user.name);
    } catch (e) {
      console.log('刷新页面了');
    }
  });
});

