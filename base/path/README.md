# path

path 模块提供用于处理文件路径和目录路径的实用工具，使用前需要`require`

```js
const path = require('path')
```


- `path.basename(path[, ext])`: 返回path的最后一部分，如 `path` 为 `/usr/local/foo.js`, 则返回 `foo.js`, 如果携带的 `ext` 参数为 `.js`, 则返回`foo`

- `path.dirnamne(path)` 返回 `path` 所在的目录名

- `path.extname(path)` 返回 `path` 的扩展名

- `path.isAbsolute(path)`  检测 path 是否为绝对路径

- `path.join([...paths])` 使用平台特定的分隔符作为定界符将所有给定的 `path` 片段连接在一起, 规范化生成的路径

- `path.normalize(path)`  规范化给定的 `path`

- `path.parse(path)` 法返回一个对象，其属性表示 path 的重要元素, 包括 `dir`、`root`、`base`、`name`、`ext`

- `path.relative(from, to)` 根据当前工作目录返回 `from` 到 `to` 的相对路径

- `path.resolve([...paths])` 将路径或路径片段的序列解析为绝对路径, 如果根据参数无法得到绝对路径，就以当前所在路径作为基准
