# grunt-contrib-jshint v0.8.0

> 使用 JSHint 验证 JavaScript 文件

## Getting Started

这个插件要求 Grunt 为 `0.4.0` 或以上版本。

请查阅相关文档来了解什么是 Grunt [Grunt新手入门](http://www.gruntjs.org/article/getting_started.html)，比如如何创建 Gruntfile，如何配置 Grunt 任务，如何安装 Grunt 插件。

**安装**

    npm install grunt-contrib-jshint --save-dev
    
安装好之后，可以在 Gruntfile 文件中使用如下方式载入这个插件:

    grunt.loadNpmTasks('grunt-contrib-jshint');
    
也可以通过在 `package.json` 文件中配置插件依赖，然后使用 `npm install` 的方式统一安装所有依赖的插件。

## Jshint 任务

可以使用 `grunt jshint` 命令来运行一个 jshint 任务。

任务目标，需要检查的文件以及其他配置选项在任务配置中指定。

- [JSHint 官网](http://jshint.com/)
- [jslinterrors查询](http://jslinterrors.com/)

### 配置选项

指定的任何选项都会直接传递给 JSHint，因此可以指定任何 JSHint 所支持的选项。查看[官方文档](http://www.jshint.com/docs/)可以获取对应的选项支持列表。

事实上 JSHint 还支持一些额外的配置选项。

#### globals

- 类型 (Type)：`Object`
- 默认值：`null`

这个选项用于配置一个全局变量映射，其中每个键 (keys) — 属性名对应一个 Boolean 值用于表示这些全局变量是否可信任。这个选项并非标准的 JSHint 选项，但是它可以作为第三个参数传递给 JSHINT 函数。详细信息请参阅[官方文档](http://www.jshint.com/docs/)

#### jshintrc

- 类型：`Object` 或者 `true`
- 默认值：`null`

设置为 `true` 就表示没有给 jshint 传递配置信息，并且 jshint 会自动相对于要检测的文件来搜索 `.jshintrc` 文档。

如果指定一个文件名，就会启用这个文件中指定的选项和全局定义。`.jshintrc` 必须是一个有效的 JSON 文件并且看起来像下面这样：

```javascript
{
    "curly": true,
    "eqnull": true,
    "eqeqeq": true,
    "undef": true,
    "globals": {
        "jQuery": true
    }
}
```
    
> 注意 `.jshintrc` 中的设置不会与 Grunt 配置中的选项合并。

#### extensions

- 类型：`String`
- 默认值：`''`

检查列表中指定的非 `.js` 扩展名的文件。

#### ignores

- 类型：`Array`
- 默认值：`null`

一个忽略的文件和目录列表。启用这个选项会覆盖 `.jshintignore` 中的设置，但是不会合并。

#### force

- 类型：`Boolean`
- 默认值： `false`

设置 `force` 选项为 `true` 就表示报告 JSHint 错误但是不会让任务失败(不终止任务)。

#### reporter

- 类型：`String`
- 默认值：`null`

允许修改这个插件的输出。默认情况下它使用的是内置的 Grunt reporter。可以设置为自己的自定义的 reporter 或者 JSHint 内置的 reporters：`jshint` 或者 `checkstyle`。

[编写自己的 JSHint repoter](http://jshint.com/docs/reporters/)

#### reportOutput

- 类型：`String`
- 默认值：`null`

指定一个文件路径来输出 reporter 的结果。如果指定了 `reportOutput` ，那么所有的输出信息都会写入指定的文件路径，而不是打印标准输出流。

### 示例

#### 使用通配符

在下面的例子中，运行 `grunt jshint:all` 或者 `grunt jshint` (因为 `jshint` 是一个多任务类型的任务)就会校验项目的 Gruntfile 文件，以及位于 `lib` 和 `test` 目录及其子目录中的所有 JavaScript 文件，这里会使用 JSHint 的默认配置。

```javascript
// 项目配置
grunt.initConfig({
    jshint: { // 任务名称
        // 任务目标，这里的 all 目标是可选的
        // 注意这里的文件列表是使用数组指定的
        all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    }
});
```

#### 校验合并前和合并后的文件

在下面的例子中，运行 `grunt jshint` 将会自动校验 'beforeconcat' 和 'afterconcat' 中指定的文件。在这里，这方式并不理想，因为 `dist/output.js` 可能在使用 [grunt-contrib-concat 插件](https://github.com/gruntjs/grunt-contrib-concat)的 `concat` 任务创建之前就进行校验操作了。

这种情况下，就应该先校验 'beforeconcat' 中指定的文件，然后在校验 'afterconcat' 中指定的文件，通过运行 `grunt jshint:befoerconcat concat jshint:afterconcat` 以手动指定任务运行顺序的方式达到预期的要求。

```javascript
grunt.initConfig({
    concat: {
        dist: {
            src: ['src/foo.js', 'src/bar.js'],
            dest: 'dist/output.js'
        }
    },
    jshint: {
        beforeconcat: ['src/foo.js', 'src/bar.js'],
        afterconcat: ['dist/output.js']
    }
});
```

#### 设置 JSHint 选项和 gobals

在下面的例子中，使用自定义的方式指定 JShint 的相关选项。注意，运行 `grunt jshint:uses_defaults` 时，会启用默认的选项校验文件，但是运行 `grunt jshint:with_overrides` 时，就会使用合并后的任务/目标选项来校验文件。

```javascript
grunt.initConfig({
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
                jQuery: true
            },
        },
        uses_defaults: ['dir1/**/*.js', 'dir2/**/*.js'],
        with_overrides: {
            options: {
                curly: false,
                undef: true,
            },
            files: {
                src: ['dir3/**/*.js', 'dir4/**/*.js']
            },
        }
    },
});
```

#### 忽略特定的警告信息

如果希望忽略下面这种特定的警告信息：

    [L24:C9] W015: Expected '}' to have an indentation at 11 instead at 9.

可以通过在选项中给警告信息 id 前置一个 `-` 做到：

```javascript
grunt.initConfig({
    jshint: {
        ignore_warning: {
            options: {
                '-W015': true,
            },
            src: ['**/*.js'],
        },
    },
});
```

