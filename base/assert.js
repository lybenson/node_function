/**
assert.AssertionError 类 
Error 的子类，表明断言的失败。 assert 模块抛出的所有错误都是 AssertionError 类的实例。

构造函数
new assert.AssertionError(options)

options:
  - message
  - actual
  - expected
  - operator
  - stackStartFn
 */

const assert = require('assert')

const { message } = new assert.AssertionError({
  message: 'error happend',
  actial: 1,
  expected: 2,
  operator: 'strictEqual'
})
// 验证错误的输出：
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}
