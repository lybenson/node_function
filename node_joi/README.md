### 简介
joi用来对数据进行验证，用以确保数据的正确性。

### 使用

引入joi

```javascript
const Joi = require('joi');
```

首先，创建一个对数据进行验证的模式对象，其被约束为string类型。

```javascript
const schema = {
  a: Joi.string()
};
```

之后根据模式验证值是否正确

```javascript
const {error, value} = Joi.validate({ a: 'a string' }, schema);
// 或者
Joi.validate({ a: 'a string' }, schema, function (err, value) { });
```

输入值通过验证则`error`则为`null`

该模式对象可以是一个纯JavaScript对象，其中每个键都分配了一个joi类型，或者它可以直接作为一个joi类型：

```javascript
const schema = Joi.string().min(10);
```

如果模式是joi类型，则可以直接在该类型上调用schema.validate（value，callback）。传递非类型模式对象时，模块会将其内部转换为相当于以下的对象（）类型：

```javascript
const schema = Joi.object().keys({
    a: Joi.string()
});
```

验证模式时：

* 默认情况下，值（或对象的情况下的键）是可选的。

  ```javascript
  Joi.validate(undefined, Joi.string()); // validates fine
  ```

  要禁止此行为，您可以根据需要设置模式（），或者在传递选项时将状态设置为“必需”

  ```javascript
  Joi.validate(undefined, Joi.string().required());
  // or
  Joi.validate(undefined, Joi.string(), /* options */ { presence: "required" });
  ```

* 字符串默认是utf-8编码

* 规则以添加方式定义，并按照白名单和黑名单检查顺序进行评估。



### API

