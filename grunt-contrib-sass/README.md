# grunt-contrib-sass v0.7.3 [![Build Status](https://travis-ci.org/gruntjs/grunt-contrib-sass.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-sass)

> 编译sass文件

## 新手入门

如果你还不了解grunt，请查阅相关文档来了解什么是 Grunt [Grunt 新手入门](http://www.gruntjs.org/article/getting_started.html)，它会告诉你怎样去创建一个`gruntfile`以及如何安装和使用grunt插件。一旦你熟悉了这个流程，使用下面的命令安装这个插件:

    npm install --save-dev grunt-contrib-sass

一旦插件安装成功，你可以在你的Gruntfile中加入下面的这段javascript代码来激活它:

    grunt.loadNpmTasks('grunt-contrib-sass');


## Sass任务

可以使用 `grunt sass` 命令来运行 sass 任务。

[Sass](http://sass-lang.com)是一个css预处理器，通过sass你可以使用嵌套、变量、混入、函数、继承等来管理css。你可以将sass编译成的标准的css文件放到网站上或应用程序上。

该任务需要运行在安装了[Sass](http://sass-lang.com/download.html)的[Ruby](http://www.ruby-lang.org/en/downloads/)环境下。如果你使用的是OS X 或者 Linux环境，默认一般都安装[Ruby](http://www.ruby-lang.org/en/downloads/)。你可以使用`ruby -v`来测试是否成功安装ruby。当ruby安装成功后，运行`gem install sass`来安装sass。

提示：以下划线`_`开头的sass文件编译时会被忽略。ps: 一般情况下只想通过`@import`导入的，而不想生成对应css文件的可以使用下划线开头来命名。


### 配置选项


#### sourcemap

- 类型: `Boolean`  
- 默认值: `false`

启用Source Maps.

**需要 Sass 3.3.0 或以上版本**

#### trace

- 类型: `Boolean`  
- 默认值: `false`

显示完整的追踪错误信息。


#### check

- 类型: `Boolean`  
- 默认值: `false`

检查语法，不校验值。

#### style

- 类型: `String`  
- 默认值: `nested`

输出css的格式，可以是 `nested`, `compact`, `compressed`, `expanded`。


#### precision

- 类型: `Number`  
- 默认值: `3`

输出小数时，默认精度为3。


#### quiet

- 类型: `Boolean`  
- 默认值: `false`

编译时是否显示警告和状态信息。


#### compass

- 类型: `Boolean`  
- 默认值: `false`

是否导入compass配置文件`config.rb`。


#### debugInfo

- 类型: `Boolean`  
- 默认值: `false`

是否输出可被FireSass等使用的额外的调试信息。


#### lineNumbers

- 类型: `Boolean`  
- 默认值: `false`

是否在生成的css中显示源代码的行号。


#### loadPath

- 类型: `String|Array`

添加一个或多个sass的导入路径。


#### require

- 类型: `String|Array`

执行sass任务前导入一个或多个`ruby`库。


#### cacheLocation

- 类型: `String`  
- 默认值: `.sass-cache`

sass缓存文件存放的路径


#### noCache

- 类型: `Boolean`  
- 默认值: `false`

不生成sass缓存文件。


#### bundleExec

- 类型: `Boolean`  
- 默认值: `false`

通过[bundle exec](http://gembundler.com/man/bundle-exec.1.html)运行`sass` : `bundle exec sass`.


#### banner

- 类型: `String`  

在输出的文件头加上指定的字符串或有用的许可信息。

*开启`sourcemap`选项时该配置不能使用*

### 示例

#### 配置示例

    grunt.initConfig({
    sass: {                              // sass任务
      dist: {
        options: {                       // 任务配置
          style: 'expanded'
        },
        files: {                         // 文件列表
          'main.css': 'main.scss',       // '目标文件': '源文件'
          'widgets.css': 'widgets.scss'
        }
      }
    }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass']);


#### 编译示例

    grunt.initConfig({
      sass: {
        dist: {
          files: {
            'main.css': 'main.scss'
          }
        }
      }
    });

#### 编译多个文件

你可以在`files`列表里配置多个源文件和目标文件。

    grunt.initConfig({
      sass: {
        dist: {
          files: {
            'main.css': 'main.scss',
            'widgets.css': 'widgets.scss'
          }
        }
      }
    });

#### 编译一个目录里的sass文件

你可以使用`expand`相关属性来指定一个目录，而不是在`files`列表里列出所有文件。更多信息可参考 [grunt docs](http://www.gruntjs.org/docs/configuring-tasks.html) - `构建动态文件对象`。

    grunt.initConfig({
      sass: {
        dist: {
          files: [{
            expand: true,
            cwd: 'styles',
            src: ['*.scss'],
            dest: '../public',
            ext: '.css'
          }]
        }
      }
    });