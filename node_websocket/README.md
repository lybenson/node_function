title: websock
date: 2017-02-15 16:23:40
tags:


http

- 虽然http中keep-alive 可以使一次长连接发送多请求，但实际上其并非持久连接
- 一个request只能有一个response，而且该response是被动的，不能主动获得
- 每次http操作都客户端和服务器都需要交换http header，信息交换率降低。

WebSocket

WebSocket 是 HTML5 一种新的协议。实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯，它建立在 TCP 之上，同 HTTP 一样通过 TCP 来传输数据，但是它和 HTTP 最大不同是：

- WebSocket 是一种双向通信协议，在建立连接后，WebSocket 服务器和客户端都能主动的向对方发送或接收数据
-  HTTP 每次操作都需要客户端与服务端建立连接，而WebSocket 是类似 Socket 的 TCP 长连接的通讯模式，一旦 WebSocket 连接建立后，即可进行通讯。在客户端断开 WebSocket 连接或 Server 端断掉连接前，不需要客户端和服务端重新发起连接请求

释：

- 单工: A只能发信号，B只能接收信号 ，通信是单向的
- 半双工:A能发信号给B, B也能发信号给A ，但是，这两个过程不能同时进行
- 全双工: A和B都能作为信号的收发端，并且信号的收发可以同时进行

WebSocket  客户端连接报文：

<!--more -->

    GET /api HTTP/1.1
    Host: www.example.com
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13
    Origin: http://example.com

相比于http协议的握手请求中,多了

    Upgrade: websocket
    Connection: Upgrade

这句是告诉Apache、Nginx等服务器，客户端发起的是WebSocket  协议

    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13

Sec-WebSocket-Key是一个base64编码的值,是浏览器随机生成的，并要求服务端必须返回一个对应加密的Sec-WebSocket-Accept应答

Sec-WebSocket-Protocol是一个用户定义的字符串,用来区分同URL下,不同的服务所需要的协议

Sec-WebSocket-Version 用来告诉服务器使用的WebSocket  协议版本



服务器返回以下内容，表示接收到了请求，并已成功建立WebSocket  

    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
    Sec-WebSocket-Protocol: chat

从这里开始就是http最后负责的区域。告诉客户端已经切换协议了

    Upgrade: websocket
    Connection: Upgrade

Sec-WebSocket-Accept的值是经过服务器确认，并且加密过后的Sec-WebSocket-Key

Sec-WebSocket-Protocol表示最终使用的协议



WebSocket  的作用

1.主动性。服务器主动推送消息给客户端

2.websock只需要建立一次http握手，这个通讯过程就是建立在这一次连接中的。


和socket的区别


参考文章：

刨根问底 HTTP 和 WebSocket 协议(上)

刨根问底 HTTP 和 WebSocket 协议(下)

WebSocket 和 Socket 的区别
