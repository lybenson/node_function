var jwt = require('jsonwebtoken')

const secret = 'mysecret'

// 生成token
var token = jwt.sign({ 
  uname: 'root', 
  exp: Math.floor(Date.now() / 1000) + (60 * 60) 
}, secret);

// 验证
jwt.verify(token, secret, function(err, decoded) {
  if (err) {
    // res.status(401).send('UnAuthorization')
  }
  // res.status(200).json(decoded)
});
