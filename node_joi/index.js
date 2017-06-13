const Joi = require('joi');

const schema = {
  a: Joi.string()
};

const value = {
  a: 'abc'
}
Joi.validate(value, schema, function (err, value) {
  console.log("err:" + err);
  console.log("value:" + JSON.stringify(value));
});


const schema2 = Joi.string().min(10);
schema2.validate("abcdefghijk", function (err, value) {
  console.log("err:" + err);
  console.log("value:" + value);
})


