# Buffer

在引入 `TypedArray` 之前，`JavaScript` 语言没有用于读取或操作二进制数据流的机制。 `Buffer` 类是作为 `Node.js API` 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。

`Buffer` 类的实例类似于整数数组，但对应于 V8 堆外部的固定大小的原始内存分配。 `Buffer` 的大小在创建时确定，且无法更改。

`Buffer` 类在全局作用域中，因此无需使用 `require('buffer').Buffer`。


```js
// 创建一个长度为 10 字节、且用零填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

`buffer`拷贝

```js
let bytes = new Buffer(8);

for (var i = 0; i < bytes.length; i++) {
  bytes[i] = i;
}

var more = new Buffer(4);
bytes.copy(more, 0, 4, 8);
more[0] // 4
```
`copy`方法将`bytes`实例的4号成员到7号成员的这一段，都拷贝到了`more`实例从0号成员开始的区域。

`Buffer`对象与字符串的互相转换，需要指定编码格式。目前，`Buffer`对象支持以下编码格式。

- ascii
- utf8
- utf16le
- ucs2
- base64
- hex


# Buffer 和 TypedArray

`TypedArray`构造函数可以接受`Buffer`实例作为参数，生成一个二进制数组。比如，`new Uint32Array(new Buffer([1, 2, 3, 4]))`，生成一个4个成员的二进制数组。
二进制数组的操作，与`Buffer`对象的操作基本上是兼容的，只有轻微的差异。比如，二进制数组的`slice`方法返回原内存的拷贝，而`Buffer`对象的`slice`方法创造原内存的一个视图

```js
const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 拷贝 arr 的内容。
const buf1 = Buffer.from(arr);
// 与 arr 共享内存。使用 TypeArray 的 .buffer 属性可以创建一个与其共享内存的 Buffer。
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
// 打印: <Buffer 88 a0>
console.log(buf2);
// 打印: <Buffer 88 13 a0 0f>

arr[1] = 6000;

console.log(buf1);
// 打印: <Buffer 88 a0>
console.log(buf2);
// 打印: <Buffer 88 13 70 17>
```

Buffer 可以使用 for...of 进行迭代

```js
const buf = Buffer.from([1, 2, 3]);

// 打印:
//   1
//   2
//   3
for (const b of buf) {
  console.log(b);
}
```

# Buffer类方法

- `Buffer.isEncoding(encoding)`  `Buffer`实例是否为指定编码。

- `Buffer.isBuffer(obj)`  对象是否为`Buffer`实例

- `Buffer.byteLength(string[, encoding])` 字符串实际占据的字节长度，默认编码方式为`utf8`

- `Buffer.concat(list[, totalLength])`  将一组`Buffer`对象合并为一个`Buffer`对象。

- `Buffer.compare(buf1, buf2)`  `buf1` 与 `buf2`，主要用于 `Buffer` 数组的排序


# 属性

- `buf.length`  内存中分配给 buf 的字节数

- `buf.buffer`  返回 `Buffer` 底层的 `ArrayBuffer` 对象

# 实例方法

- buf.write(string[, offset[, length]][, encoding])  根据 encoding 指定的字符编码将 string 写入到 buf 中的 offset 位置

```js
const buf = Buffer.alloc(256);

const len = buf.write('\u00bd + \u00bc = \u00be', 0);

console.log(`${len} 个字节: ${buf.toString('utf8', 0, len)}`);
// 打印: 12 个字节: ½ + ¼ = ¾
```


- `buf.slice([start[, end]])`  创建一个指向与原始 `Buffer` 同一内存的新 Buffer

- `buf.toString([encoding[, start[, end]]])`  根据 `encoding` 指定的字符编码将 buf 解码成字符串

- `buf.toJSON()`  返回 `buf` 的 `JSON` 格式。 当字符串化 `Buffer` 时，`JSON.stringify()` 会调用该函数。