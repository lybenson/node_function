var redis = require('redis');
var client = redis.createClient(6379, 'localhost');

//订阅消息
client.subscribe('testPublish');

//接收消息
client.on('message', function(channel, msg) {
	console.log('channel:', channel, 'message:', msg);
});