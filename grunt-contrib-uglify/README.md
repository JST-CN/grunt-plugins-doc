# grunt-contrib-uglify v0.2.8

> 使用 UglifyJS 压缩文件

## Getting Start

这个插件要求 Grunt 为 `0.4.0` 或以上版本。

请查阅相关文档来了解什么是 Grunt [Grunt新手入门](http://www.gruntjs.org/article/getting_started.html)，比如如何创建 Gruntfile，如何配置 Grunt 任务，如何安装 Grunt 插件。

**安装**

    npm install grunt-contrib-uglify --save-dev
    
安装好之后，可以在 Gruntfile 文件中使用如下方式载入这个插件:

    grunt.loadNpmTasks('grunt-contrib-uglify');
    
## Uglify 任务

*使用 `grunt uglify` 命名运行这个任务*。

任务的目标，文件和选项可以根据[配置任务](http://www.gruntjs.org/article/configuring_tasks.html)指南来指定。

## 选项

这个任务主要是依赖于 [UglifyJS2](https://github.com/mishoo/UglifyJS2)，因此推荐阅读 [UglifyJS 文档](http://lisperator.net/uglifyjs/)来了解高级配置。

**mangle**

- 类型：`Boolean` `Object`
- 默认值：`{}`

启用或者关闭压缩的默认选项。如果指定一个 `Object`，它会直接传递给 `ast.mangle_names()` 和 `ast.conpute_char_frequency()` (模拟命令行的行为)。

**compress**

- 类型：`Boolean` `Object`
- 默认值：`{}`

启用或者关闭源码压缩的默认选项。如果指定一个 `Object`，它回作为选项传递给 `UglifyJS.Compressor()`。

**beautify**

- 类型：`Boolean` `Object`
- 默认值：`false`

启用生成的源代码美化效果。如果是一个 `Object` 将被合并并和选项一起传递发送给 `Uglify.OutputStream()`。

**report**

- 可选项：`false`, `'min'`, `'gzip'`
- 默认值：`false`

要么不报告任何信息，要么只报告压缩结果，或者报告压缩并启用 gzip 的结果。这对于查看 Uglify 的执行非常有用，但是使用 `'gzip'` 可以在执行时提升 5-10 倍的速度。

启用 `'gzip'` 输出的示例：

    Original: 198444 bytes.
    Minified: 101615 bytes.
    Gzipped:  20084 bytes.
    
**sourceMap**



   
