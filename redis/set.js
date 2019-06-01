var redis = require('redis');
var client = redis.createClient(6379, 'localhost');

//集合操作 -不会插入重复的值
client.sadd('setTest', 1);
client.sadd('setTest', 'a');
client.sadd('setTest', 'b');
client.smembers('setTest', function (err, v) {
  console.log('redis get key err,v :', err, v);
})
