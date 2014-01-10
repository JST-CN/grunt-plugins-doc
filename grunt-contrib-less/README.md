# grunt-contrib-less v0.9.0

> 编译less文件为css

## Getting Started

这个插件要求 Grunt 为 `0.4.0` 或以上版本。

如果你还不了解grunt，请查阅相关文档来了解什么是 Grunt [Grunt新手入门](http://www.gruntjs.org/article/getting_started.html)，比如如何创建 Gruntfile，如何配置 Grunt 任务，如何安装 Grunt 插件。

### 安装less

	npm install grunt-contrib-less --save-dev

安装好之后，可以在 Gruntfile 文件中使用如下方式载入less插件:

	grunt.loadNpmTasks('grunt-contrib-less');

该插件能够完美运行在 Grunt 0.4.x 版本，如果你还在使用 Grunt 0.3.x 的版本，建议您尽快升级 [怎样升级](http://gruntjs.com/upgrading-from-0.3-to-0.4)。


## Less 任务

可以使用 `grunt less` 命令来运行一个 less 任务。

任务目标，需要压缩的文件以及其他配置选项可以在任务配置中指定，配置可参考 [任务配置说明](http://www.gruntjs.org/article/configuring_tasks.html) 。

### 配置选项

#### paths

- 类型(Type): `String` `Array`
- 默认值(Default): 与待编译文件目录相同

该选项用来指定less中通过 `@import` 导入的文件对应的路径，默认与待编译文件路径相同。

#### rootpath

- 类型(Type): `String`
- 默认值(Default): `""`

用来指定一个根目录，编译时会把这个路径添加到每个本地资源地址的前面。

#### compress

- 类型(Type): `Boolean`
- 默认值(Default): `false`

生成的文件是否删除空格进行压缩，默认不压缩。

#### cleancss

- 类型(Type): `Boolean`
- 默认值(Default): `false`

是否使用 [clean-css](https://github.com/GoalSmashers/clean-css) 进行压缩，默认不使用。

#### ieCompat

- 类型(Type): `Boolean`
- 默认值(Default): `true`

输出的css文件兼容IE8模式。

例如，data-uri中包含了一个用base64编码的文件，并将其通过css引入，而IE8限制了data-uri的字节为32kb，因此开启ieCompat选项可防止超过这个数值。


#### optimization

- 类型(Type): `Integer`
- 默认值(Default): `null`

设置解析器的优化级别。数字越低，创建的节点就越少。当进行调试或者想访问其中的节点可以设置这个选项。


#### strictImports

- 类型(Type): `Boolean`
- 默认值(Default): `false`

启用严格的导入模式，默认不启用。

#### strictMath

- 类型(Type): `Boolean`
- 默认值(Default): `false`

如果开启此项，则相关数学运算必须加上括号才有效。

#### strictUnits

- 类型(Type): `Boolean`
- 默认值(Default): `false`

当开启该选项后，编译时会检测less中的单位。例如: 4px/2px = 2 可以通过，而 4em/2px 则会报错。

#### syncImport

- 类型(Type): `Boolean`
- 默认值(Default): `false`

从磁盘中同步读取 `@import` 导入的文件。


#### dumpLineNumbers

- 类型(Type): `String`
- 默认值(Default): `false`

设置支持sass调试信息。

可接收以下值: `comments`, `mediaquery`, `all`.

#### relativeUrls

- 类型(Type): `String`
- 默认值(Default): `false`

重写url为相对路径，默认false不开启。

#### report

- 可选择的值: `false` `min` `gzip`
- 默认值: `false`

report可以向我们展示less文件压缩前后以及服务器端开启gzip压缩后的css文件大小，可以很直观的看出使用clean-css的效果。

- 默认值为 `false` ，表示不展示任何信息；
- 当设置为 `min` 时会展示css压缩前和压缩后的文件大小；
- 当设置为 `gzip` 时，会展示css文件压缩前后以及服务器端开启gzip后的css文件大小。
必须说明的是当设置为 `gzip` 时，会花费原来5-10倍的时间才能完成本次任务。

下面是report设置为gzip时的显示结果：

	Original: 198444 bytes.
	Minified: 101615 bytes.
	Gzipped:  20084 bytes.


#### sourceMap

	/********************************************
	*		sourceMap  placeholder
	*********************************************/


## 示例

	less: {
	  development: {
	    options: {
	      paths: ["assets/css"]
	    },
	    files: {
	      "path/to/result.css": "path/to/source.less"
	    }
	  },
	  production: {
	    options: {
	      paths: ["assets/css"],
	      // 使用cleancss压缩
	      cleancss: true
	    },
	    files: {
	      "path/to/result.css": "path/to/source.less"
	    }
	  }
	}