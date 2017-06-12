const Joi = require('joi');

const schema = {
  a: Joi.string()
};

Joi.validate({ a: 'a string' }, schema, function (err, value) {
  console.log("err:" + err);
  console.log("value:" + JSON.stringify(value));
});
// err:null
// value:{"a":"a string"}



Joi.validate({ a: 100 }, schema, function (err, value) {
  console.log("err:" + err);
  console.log("value:" + JSON.stringify(value));
});
// err:ValidationError: child "a" fails because ["a" must be a string]
// value:{"a":100}
