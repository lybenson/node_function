var redis = require('redis');
var client = redis.createClient(6379, 'localhost');


// client.set('this-key', 'this-value');
// client.get('this-key', function(err, v) {
// 	console.log('redis get key err,v :', err, v);
// });

// //存储对象，会调用toString方法转换[Object Object]
// client.set('ages', {
// 	a: 10,
// 	b: 20
// });
// client.get('ages', function(err, v) {
// 	console.log('redis get key err,v :', err, v, typeof v);
// });

//集合操作 -不会插入重复的值
client.sadd('setTest', 1);
client.sadd('setTest', 'a');
client.sadd('setTest', 'b');
client.smembers('setTest', function（ err, v) {
console.log('redis get key err,v :', err, v);
});
//
//
//
//