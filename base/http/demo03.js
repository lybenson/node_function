const http = require('http')

let options = {
  hostname: '127.0.0.1',
  port: 8000
}
let clientReq = http.request(options)
clientReq.on('response', res => {
  res.on('data', chunk => {
    console.log(chunk.toString())
  })
  console.log(res.statusCode)
})

clientReq.on('error', err => {
  console.log(err.message)
})
clientReq.end()