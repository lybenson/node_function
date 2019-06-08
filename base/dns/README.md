# DNS

`DNS`模块用于解析域名，`resolve4`方法用于`IPv4`环境，`resolve6`方法用于`IPv6`环境，`lookup`方法在以上两种环境都可以使用，返回`IP`地址（`address`）和当前环境（`IPv4`或`IPv6`）。


```js
const dns = require('dns');

dns.resolve4('www.baidu.com', function (err, addresses) {
  if (err)
    console.log(err);

  console.log('addresses: ' + JSON.stringify(addresses));
});

dns.lookup('www.baidu.com', function (err, address, family) {
  if (err)
    console.log(err);

  console.log('addresses: ' + JSON.stringify(address));
  console.log('family: ' + JSON.stringify(family));
});
```
