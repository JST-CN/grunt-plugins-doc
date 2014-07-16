> 粗译，待实验较正。

# grunt-contrib-uglify v0.5.0

> 使用 UglifyJS 压缩文件

## Getting Start

这个插件需要 Grunt `^0.4.0` 支持（译注：0.4.0或以上版本）。

如果在此之前你还没用过[Grunt](http://gruntjs.com/)，最好先阅读一下[Getting Start](http://gruntjs.com/getting-started)指南，这个指南解释了如何创建[Gruntfile](http://gruntjs.com/sample-gruntfile)以及如何安装和使用Grunt插件。一旦你熟悉这个过程之后，可以使用下面这条命令安装这个插件：

```shell
npm install grunt-contrib-uglify --save-dev
```

安装好插件之后，还需要在你的Gruntfile中使用下面这行JavaScript启用这个插件：

```javascript
grunt.loadNpmTasks('grunt-contrib-uglify');
```

## Uglify Task

_可以使用`grunt uglify`命令运行这个任务_

任务目标(target)，文件和选项的指定和[任务配置](http://gruntjs.com/configuring-tasks)指南中的描述一致即可。

### 2.x到3.x升级注意事项

`3.x`版引入了更改source map配置介绍。但是如果你不用source map选项可以无缝升级。如果要用source map，请阅读下面的说明。

#### 移除的选项

`sourceMapRoot` - source 位置现在会在`sourceMap`选项设置为`true`的时候给你计算。

`sourceMapPrefix` - 综合上述原因这个就不需要了。

`sourceMappingUrl` - 这个也是自动计算的。

#### 改变的选项

`sourceMap` - 只接受一个`Boolean`值。生成一个带默认名字的map文件。

#### 新选项

`sourceMapName` - 接受一个字符串或者改变map位置或名称的函数。

`sourceMapIncludeSources` - 直接将源文件的内容嵌入到 map `expression` 中 - 接受一个`Boolean`只。解析单个表达式（JSON或者是独立函数）。

### 选项

这个任务主要是委托给[UglifyJS2](https://github.com/mishoo/UglifyJS2)做，因此请考虑将[UglifyJS 文档](http://lisperator.net/uglifyjs/)作为高级配置的必读文档。

#### mangle

类型：`Boolean` `Object`

默认值：`{}`

开启或关闭缩短变量名的默认选项。如果指定一个`Object`，会直接传递给`ast.mangle_names()`和`ast.compute_char_frequency()`（模仿命令行行为）。

#### compress

类型：`Boolean` `Object`

默认值：`{}`

开启或关闭文件压缩的默认选项。如果指定一个`Object`，会作为选项传递给`UglifyJS.Compressor()`。

#### beautify

类型：`Boolean` `Object`

默认值：`false`

开启美化生成的源代码。`Object`会被合并，并且和选项一起被发送给`UglifyJS.OutputStream()`。

__expression__

类型：`Boolean`

默认值：`false`

解析单个表达式，而不是程序（解析JSON）。

#### report

选项：`'min'`，`'gzip'

默认值：`'min'`

要么到处压缩结果，要么到处压缩并启用gzip的结果。这对于查看clean-css到底是如何执行的很有用，但是在任务中使用需要5-10倍的时间才能完成。[示例输出](https://github.com/sindresorhus/maxmin#readme)。

#### sourceMap

类型：`Boolean`

默认值：`false`

如果设置为 `true`，会在目标文件相同目录生成一个source map文件。默认情况下和目标文件同名，但是带有一个 `.map` 扩展名。

#### sourceMapName

类型：`String` `Function`

默认值：`undefined`

为了自定义生成的 source map 的名称或者位置，可以传入一个字符串来指示在哪里写入 source map 文件。如果提供一个函数，uglify 目标会作为参数传入，并且其返回值会用作文件名。

#### sourceMapIn

类型：`String` `Function`

默认值：`undefined`

从预编译中输入的 source map 的位置，比如从CoffeeScript中。如果提供一个函数，uglify source 会作为参数传递，并且其返回值将被用作 sourceMap 名称。这只在只有一个源文件的时候有意义。

#### sourceMapIncludeSources

类型：`Boolean`

默认值：`false`

如果你想将源文件内容包含到source map 的 sourcesContent 属性中就要传递这个标记。

__enclose__

类型：`Object`

默认值：`undefined`

用一个可配置的参数列表将所有的代码包裹在闭包里面，`enclose`对象中的每个键值(key-value)对实际上就是一个参数对。

#### wrap

类型：`String`

默认值：`undefined`

将所有代码包裹到闭包中，一种确保没有遗漏的简单方式。对于变量需要公共的 `export` 和 `global` 变量让其有效。包裹的值也就是全局变量到处的可用信息。

> 这个部分回头测试下再校对文档。

#### exportAll

类型：`Boolean`

默认值：`false`

当使用 `wrap` 的时候会让所有的全局函数和变量通过export变量使用。

#### preserveComments

类型：`Boolean` `String` `Function`

默认值：`undefined`

选项：`false` `'all'` `some`

开启注释保留：

- `false` 移除所有注释
- `'all'` 保留还没有被压缩或移除的代码块中的所有注释
- `'some'` 保留以`!`开头的或者包含一个closure compiler风格指令（`@preserve`，`@lisence`，`@cc_on`）的所有注释。
- `Function` 指定自己的注释保留函数。将会传入当前节点和注释并预期返回`true`或`false`。


#### banner

类型：`String`

默认值：空字符串

这个字符串会前置插入压缩后的输出中。模板字符串（比如：`<%= config.value %>）会被自动解析。

#### footer

类型：`String`

默认值：空字符串

这个字符串会插入呀所有的输出中。模板字符串（比如：`<%= config.value %>）会被自动解析。

### 用例

#### 基本压缩

这个配置会使用默认选项压缩和缩减输入的文件。

```javascript
// 项目配置
grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'dest/output.min.js': ['src/input1.js', 'src/input2.js']
      }
    }
  }
});
```

#### 不压缩变量名

指定`mangle:false`可以阻止改变变量和函数名。

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### 保留标识符

你可以在`mangle`选项中使用`except`数组指定保持不变的标识符、

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      mangle: {
        except: ['jQuery', 'Backbone']
      }
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### Source maps

通过设置`sourceMap`选项为`true`生成source map文件。生成的source map会保存在和目标文件相同的目录中。它的名称也与目标文件同名，但是带有一个`.map`扩展名。可以使用`sourceMapName`属性覆盖这个默认设置。

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        sourceMap: true,
        sourceMapName: 'path/to/sourcemap.map'
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### 高级 source maps

设置`sourceMapIncludeSources`选项为`true`将源文件直接嵌入map文件中。要从之前编译结果中引入source map文件将它传递给`sourceMapIn`选项即可。

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: 'example/coffeescript-sourcemap.js', // input sourcemap from a previous compilation
      },
      files: {
        'dest/output.min.js': ['src/input.js'],
      },
    },
  },
});
```

更多信息请参考[Uglify SourceMap 文档](http://lisperator.net/uglifyjs/codegen#source-map)。

#### 移除console.*函数

将`drop_console: true`指定为`compress`选项的一部分可以用来移除`console.*`系列函数的调用。

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      compress: {
        drop_console: true
      }
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### 代码美化

指定`beautify: true`可以美化代码便于调试和分析。传递一个对象来手动配置任何其他输出选项都会直接传递给`UglifyJS.OutputStream()`。

更多信息请查看[UglifyJS Codegen 文档](http://lisperator.net/uglifyjs/codegen)。

_注意，手动配置需要显示设置`beautify: true`，如果你想照惯例，美化输出。_

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      options: {
        beautify: true
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    },
    my_advanced_target: {
      options: {
        beautify: {
          width: 80,
          beautify: true
        }
      },
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### Banner 注释

在这个例子中，运行`grunt uglify:my_target`将会前置插入一个由插值`banner`模板字符串使用配置对象创建的banner。这里，这些属性是从`package.json`文件中导入的值（可以通过`pkg`这个配置属性访问）加今天的日期。

_注意：不一定必须使用外部的JSON文件。也可以在配置里面有效的创建内联的`pkg`对象。也就说，如果你已经有JSON文件了，你不妨引用它。_

```javascript
// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### 条件编译

还可以启用UglifyJS的条件遍历。通常用于为产品构建移除调试代码块。

更多信息请参考[UglifyJS 全局定义 文档](http://lisperator.net/uglifyjs/compress#global-defs)。

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      compress: {
        global_defs: {
          "DEBUG": false
        },
        dead_code: true
      }
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### 动态的将所有文件编译到一个目录中

下面这个配置将会动态的编译和缩小文件。

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'dest/js'
      }]
    }
  }
});
```

## Release History

* 2014-06-11   v0.5.0   added option "expression" to uglify json and single functions. Removes unnecessary source map function. Simplify default source map naming function. Normalizes header and footer linefeeds. Source map names follow specs. Updates sourcemapin fixture.
 * 2014-03-01   v0.4.0   remove grunt-lib-contrib dependency and add more colors
 * 2014-02-27   v0.3.3   remove unnecessary calls to `grunt.template.process`
 * 2014-01-22   v0.3.2   fix handling of `sourceMapIncludeSources` option.
 * 2014-01-20   v0.3.1   fix relative path issue in sourcemaps
 * 2014-01-16   v0.3.0   refactor sourcemap support
 * 2013-11-09   v0.2.7   prepending banner if sourceMap option not set, addresses
 * 2013-11-08   v0.2.6   merged 45, 53, 85 (105 by way of duping 53) Added support for banners in uglified files with sourcemaps Updated docs
 * 2013-10-28   v0.2.5   Added warning for banners when using sourcemaps
 * 2013-09-02   v0.2.4   updated sourcemap format via /83
 * 2013-06-10   v0.2.3   added footer option
 * 2013-05-31   v0.2.2   Reverted /56 due to /58 until [chrome/239660](https://code.google.com/p/chromium/issues/detail?id=239660&q=sourcemappingurl&colspec=ID%20Pri%20M%20Iteration%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified) [firefox/870361](https://bugzilla.mozilla.org/show_bug.cgi?id=870361) drop
 * 2013-05-22   v0.2.1   Bumped uglify to ~2.3.5 /55 /40 Changed sourcemappingUrl syntax /56 Disabled sorting of names for consistent mangling /44 Updated docs for sourceMapRoot /47 /25
 * 2013-03-14   v0.2.0   No longer report gzip results by default. Support `report` option.
 * 2013-01-30   v0.1.2   Added better error reporting Support for dynamic names of multiple sourcemaps
 * 2013-02-15   v0.1.1   First official release for Grunt 0.4.0.
 * 2013-01-18   v0.1.1rc6   Updating grunt/gruntplugin dependencies to rc6. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-09   v0.1.1rc5   Updating to work with grunt v0.4.0rc5. Switching back to this.files api.
 * 2012-11-28   v0.1.0   Work in progress, not yet officially released.

---

Task submitted by ["Cowboy" Ben Alman](http://benalman.com)

*This file was generated on Wed Jun 11 2014 17:27:16.*