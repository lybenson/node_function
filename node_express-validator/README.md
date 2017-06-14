### 简介
[node-validator](https://github.com/chriso/validator.js)的express.js中间件
### 安装

```shell
npm install express-validator
```

### 使用

```javascript
var util = require('util'),
    bodyParser = require('body-parser'),
    express = require('express'),
    expressValidator = require('express-validator'),
    app = express();

app.use(bodyParser.bodyParser({ extended: true }));

// 应用 express-validator 中间件 ，且需在应用了bodyParser后
app.use(expressValidator([options]));

app.post('/:urlparam', function(req, res) {

  // 验证
  // checkBody 会检查 req.body
  // checkParams 会检查 req.params (URL 参数)
  // checkQuery 会检查 req.query (GET 请求携带的参数).
  req.checkBody('postparam', '无效 postparam').notEmpty().isInt();
  req.checkParams('urlparam', '无效 urlparam').isAlpha();
  req.checkQuery('getparam', '无效 getparam').isInt();

  // assert 会检查这三种类型的参数
  // req.assert('postparam', '无效 postparam').notEmpty().isInt();
  // req.assert('urlparam', '无效 urlparam').isAlpha();
  // req.assert('getparam', '无效 getparam').isInt();

  // SANITIZATION
  // as with validation these will only validate the corresponding
  // request object
  req.sanitizeBody('postparam').toBoolean();
  req.sanitizeParams('urlparam').toBoolean();
  req.sanitizeQuery('getparam').toBoolean();

  // OR find the relevent param in all areas
  req.sanitize('postparam').toBoolean();

  // 获取验证结果，并处理
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    res.json({
      urlparam: req.params.urlparam,
      getparam: req.query.getparam,
      postparam: req.body.postparam
    });
  });
});

app.listen(8888);
```

### 中间件选项

#### `errorFormatter`

function(param, msg, value)

`errorFormatter`选项可用于指定必须构建req.getValidationResult（）返回的验证结果中使用的错误对象的函数

```javascript
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
```

#### ``customValidators``

#### ``customSanitizers``

### 验证

#### req.check()



### 由规则验证

```javascript
req.checkBody({
 'email': {
    optional: {
      options: { checkFalsy: true } // or: [{ checkFalsy: true }]
    },
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  },
  'password': {
    notEmpty: true,
    matches: {
      options: ['example', 'i'] // pass options to the validator with the options property as an array
      // options: [/example/i] // matches also accepts the full expression in the first parameter
    },
    errorMessage: 'Invalid Password' // Error message for the parameter
  },
  'name.first': { //
    optional: true, // won't validate if field is empty
    isLength: {
      options: [{ min: 2, max: 10 }],
      errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid First Name'
  }
});
```



### 验证结果
### 可选输入
### Sanitizer
### 正则路由
### TypeScript