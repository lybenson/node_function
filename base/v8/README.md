# V8

v8 模块暴露了特定于内置到 Node.js 二进制文件中的 V8 版本的 API,它可以使用以下方式访问：

```js
const v8 = require('v8')
```


- `v8.cachedDataVersionTag()`  返回一个整数，表示从 V8 版本、命令行标志、以及检测到的 CPU 特性派生的版本标记

- `v8.getHeapSpaceStatistics()`  返回有关 V8 堆空间的统计信息，即组成 V8 堆的片段

- `v8.getHeapStatistics()` 返回堆的统计信息

- `v8.setFlagsFromString(flags)`   以编程方式设置 V8 的命令行标志

可供参考的链接

- [https://github.com/v8/v8](https://github.com/v8/v8)

- [https://www.youtube.com/watch?v=PsDqH_RKvyc](https://www.youtube.com/watch?v=PsDqH_RKvyc)

- [https://medium.com/free-code-camp/understanding-the-core-of-nodejs-the-powerful-chrome-v8-engine-79e7eb8af964](https://medium.com/free-code-camp/understanding-the-core-of-nodejs-the-powerful-chrome-v8-engine-79e7eb8af964)
