# module

在 Node.js 模块系统中，每个文件都被视为一个独立的模块。通过require引入，通过exports导出。

- 模块在第一次加载后会被缓存。
- 优先加载核心模块
- 按确切的文件名没有找到模块，则会尝试带上 `.js`、 `.json` 或 `.node` 拓展名再加载
- `require`一个目录时，查看 `package.json` 是否定义了`main`模块, 没有的话会加载该目录下的 `index.js` 或 `index.node` 文件。
- 如果传递给 `require()` 的模块标识符不是一个核心模块，也没有以 `'/'` 、 `'../'` 或 `'./'` 开头，则 `Node.js` 会从当前模块的父目录开始，尝试从它的 `/node_modules` 目录里加载模块,如果还是没有找到，则移动到再上一层父目录，直到文件系统的根目录。

# 模块作用域

- `__dirname`: 当前模块所在的目录名

- `__filename`: 当前模块文件的绝对路径

- `exports`: `module.exports`的更简短的引用形式, 用于指定一个模块所导出的内容

- `require()`: 用于引入模块、 JSON、或本地文件

- `require.cache`: 被引入的模块将被缓存在这个对象中, 从此对象中删除键值对将会导致下一次 `require` 重新加载被删除的模块

- `require.resolve(request[, options])`: 使用内部的 `require()` 机制查询模块的位置, 此操作只返回解析后的文件名，不会加载该模块

- `require.resolve.paths(request)`: 返回一个数组，其中包含解析 `request` 过程中被查询的路径。 如果 `request` 字符串指向核心模块,则返回 `null`

# module对象

在每个模块中， `module` 的自由变量是对表示当前模块的对象的引用

具有如下属性

- `children`: 被该模块引用的模块对象

- `exports`: 指定模块所导出的内容

- `filename`: 模块的绝对路径

- `id`: 模块的标识符

- `loaded`: 模块是否已经加载完成，或正在加载中。

- `parent`: 最先引用该模块的模块

- `paths`: 模块的搜索路径

- `require(id)`: 加载一个模块，返回模块的`module.exports`

- `builtinModules`: 罗列 `Node.js` 提供的所有模块名称

- `createRequireFromPath(filename)`: 返回`require`加载模块的函数
