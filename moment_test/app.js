var moment = require('moment');

var time = moment();

time.add(10, 'minutes')
console.log(time.format('MM-DD-YYYY HH:mm:ss'));