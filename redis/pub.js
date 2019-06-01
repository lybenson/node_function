var redis = require('redis');
var client = redis.createClient(6379, 'localhost');

//发布消息
client.publish('testPublish', 'message from pub.js');