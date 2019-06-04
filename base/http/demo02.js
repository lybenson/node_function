const http = require('http')
http.get({
  host: '127.0.0.1',
  port: 8000,
  path: '/'
}, function(response) {
  let body = '';
  response.on('data', function(d) {
    body += d;
  });

  response.on('end', function() {
    console.log(body);
  });
});
