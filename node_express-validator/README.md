### 简介
[node-validator](https://github.com/chriso/validator.js)的express.js的对请求数据进行格式验证的中间件。

其验证函数基于[chriso/validator.js](https://github.com/chriso/validator.js)

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

  // 数据转换(旧值->新值)
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

`req.getValidationResult()`  验证失败时会返回error对象，而 `errorFormatter`选项用来定义error对象的格式

```javascript
//  formParam的值将被变为成用于打印的表单主体格式
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

自定义验证器函数

```javascript
app.use(expressValidator({
 customValidators: {
    isArray: function(value) {
        return Array.isArray(value);
    },
    gte: function(param, num) {
        return param >= num;
    }
 }
}));
```

使用：

```javascript
req.checkBody('users', 'Users 必须是一个数组').isArray();
req.checkQuery('time', 'Time 必须是一个整形类型且值大于5').isInt().gte(5)
```



#### ``customSanitizers``

自定义数据转换函数

```javascript
app.use(expressValidator({
 customSanitizers: {
    toSanitizeSomehow: function(value) {
        var newValue = value;//数据转换
        return newValue;
    },
 }
}));
```

使用

```javascript
req.sanitize('address').toSanitizeSomehow();
```

### 验证

#### req.check()

```javascript
req.check('testparam', 'Error Message').notEmpty().isInt();
req.check('testparam.child', 'Error Message').isInt(); // find nested params
req.check(['testparam', 'child'], 'Error Message').isInt(); // find nested params
```

#### req.assert()

同`req.check()`

#### req.validate()

同`req.check()`的别名

#### req.checkBody()

类似于`req.check()`，但只用在`req.body`

#### req.checkQuery()

类似于`req.check()`,  但只用于检查`req.query`

#### req.checkParams()

类似于`req.check()`, 但只用于检查`req.params`

#### req.checkHeaders()

只检查 `req.headers`

#### req.checkCookies()

只检查`req.cookies`

### 由模式规则验证

使用简单的模式一次定义所有验证操作。如果将对象传递给任何验证器方法，将使用模式验证

```javascript
req.checkBody({
 'email': {
    optional: {
      options: { checkFalsy: true } // 或者: [{ checkFalsy: true }]
    },
    isEmail: {
      errorMessage: '无效的邮箱信息'
    }
  },
  'password': {
    notEmpty: true,
    matches: {
      options: ['example', 'i'] // 通过数组类型的options属性去验证
    },
    errorMessage: '无效的密码' // 参数的错误信息
  },
  'name.first': { //
    optional: true, // 如果字段为空则不会去验证
    isLength: {
      options: [{ min: 2, max: 10 }],
      errorMessage: '字符长度必须在2-10之间' //验证器的错误信息
    },
    errorMessage: '无效的first name'
  }
});
```

您还可以通过添加参数来定义要在模式中进行验证的req对象的某个属性，如下所示

```javascript
req.check({
 'email': {
    in: 'query',
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email'
    }
  }
});
```

`in`属性始终拥有最高的优先级，这就意味着如果你使用`in: 'query'`，那么即使执行`checkParams()`或`checkBody()`也将调用`checkQuery()`

```javascript
var schema = {
 'email': {
    in: 'query',
    notEmpty: true,
    isEmail: {
      errorMessage: '无效的邮箱'
    }
  },
  'password': {
    notEmpty: true,
    matches: {
      options: ['example', 'i'] // pass options to the validator with the options property as an array
      // options: [/example/i] // matches also accepts the full expression in the first parameter
    },
    errorMessage: '无效的密码' // Error message for the parameter
  }
};

req.check(schema);
req.checkQuery(schema);
req.checkBody(schema);
req.checkParams(schema);
req.checkHeaders(schema);
```



### 验证结果

方法`req.getValidationResult()`返回一个解析为结果对象的Promise

```javascript
req.assert('email', 'required').notEmpty();
req.assert('email', 'valid email required').isEmail();
req.assert('password', '6 to 20 characters required').len(6, 20);

req.getValidationResult().then(function(result) {
  // 
});
```

* `result.isEmpty()`
* `result.useFirstErrorOnly()`
* `result.array()`
* `result.mapped()`
* `result.throw()`

### 可选输入

你可以通过使用`optional()`方法去跳过验证，默认情况下，如果请求对象上不存在该键，则它仅跳过验证。

```javascript
req.checkBody('email').optional().isEmail();
```

### 数据转换

#### req.sanitize()

```javascript
req.body.comment = 'a <span>comment</span>';
req.body.username = '   a user    ';

req.sanitize('comment').escape(); // 返回 'a &lt;span&gt;comment&lt;/span&gt;'
req.sanitize('username').trim(); // 返回 'a user'

console.log(req.body.comment); // 'a &lt;span&gt;comment&lt;/span&gt;'
console.log(req.body.username); // 'a user'
```

#### req.filter()

同`req.sanitize()`

#### req.sanitizeBody()

类似于`req.sanitize() `,只用于`req.body`

#### req.sanitizeQuery()

类似于`req.sanitize() `,只用于`req.query`

#### req.sanitizeParams()

类似于`req.sanitize()` ,只用于`req.params`

#### req.sanitizeHeaders()

只转换`req.headers`

#### req.sanitizeCookies()

只转换`req.cookies`

### 正则路由

当前使用的正则路由如下

```javascript
app.get(/\/test(\d+)/, function() {});
```

您可以验证提取的匹配，如下所示

```javascript
req.assert(0, '没有一个三位数的整数').len(3, 3).isInt();
```

