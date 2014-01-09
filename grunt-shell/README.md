# grunt-shell [![Build Status](https://secure.travis-ci.org/sindresorhus/grunt-shell.png?branch=master)](http://travis-ci.org/sindresorhus/grunt-shell) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

> 运行shell命令

一种可以很好的与其他命令行接口工具（CLI）交互的方式。比如，编译Compass `compass compile` 或者获取当前的git分支 `git branch`。


## 新手入门

如果你之前没有使用过[grunt][] ，请一定查阅[Getting Started][]指南，因为它可以告诉你怎样去创建一个[gruntfile][Getting Started] 以及如何安装和使用grunt插件。一旦你熟悉了这个流程，使用下面的命令安装这个插件:

```shell
npm install --save-dev grunt-shell
```

一旦插件安装成功，你可以在你的Gruntfile中加入下面的这段javascript代码来激活它:

```js
grunt.loadNpmTasks('grunt-shell');
```

*Tip: [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) 模块使得它很容易可以加载多个grunt任务。*

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## 相关文档


### 配置示例

```js
grunt.initConfig({
	shell: {								// Task
		listFolders: {						// Target
			options: {						// Options
				stdout: true
			},
			command: 'ls'
		}
	}
});

grunt.loadNpmTasks('grunt-shell');
grunt.registerTask('default', ['shell']);
```


### 用法示例


#### 运行命令

创建一个名为`test`的文件夹。

```js
grunt.initConfig({
	shell: {
		makeDir: {
			command: 'mkdir test'
		}
	}
});
```

`command` 属性支持模板属性:

```js
grunt.initConfig({
	testDir: 'test',
	shell: {
		makeDir: {
			command: 'mkdir <%= testDir %>'
		}
	}
});
```

你也可以使用一个能够返回命令的函数:

```js
grunt.initConfig({
	shell: {
		hello: {
			command: function () {
				return 'echo hello';
			}
		}
	}
});
```

这个函数也可以接收参数:

```js
shell: {
	hello: {
		command: function (greeting) {
			return 'echo ' + greeting;
		}
	}
}

grunt.loadNpmTasks('grunt-shell');
grunt.registerTask('default', ['shell:hello']);
```


#### 运行命令并且显示输出结果

在你的终端输出一个目录列表。

```js
grunt.initConfig({
	shell: {
		dirListing: {
			command: 'ls',
			options: {
				stdout: true
			}
		}
	}
});
```


#### 自定义回调函数

任意处理输出的结果。

```js
function log(err, stdout, stderr, cb) {
	console.log(stdout);
	cb();
}

grunt.initConfig({
	shell: {
		dirListing: {
			command: 'ls',
			options: {
				callback: log
			}
		}
	}
});
```

#### Option passed to the .exec() method

在另一个目录中运行一条命令。在这个例子中，我们使用`cwd`(当前工作目录)选项在一个子文件夹中运行命令。

```js
grunt.initConfig({
	shell: {
		subfolderLs: {
			command: 'ls',
			options: {
				stdout: true,
				execOptions: {
					cwd: 'tasks'
				}
			}
		}
	}
});
```


#### 多条命令

通过把命令放入一个用`&&`或者`;`连接的数组来运行多条命令。`&&` 意味着只有当之前的命令运行成功后才运行当前命令。你也可以使用`&`让这些命令同时运行 (通过将最后一个命令以外的所有命令在子shell中运行)。
> (译者注：最后一个命令会在当前主shell中运行？)

```js
grunt.initConfig({
	shell: {
		multiple: {
			command: [
				'mkdir test',
				'cd test',
				'ls'
			].join('&&')
		}
	}
});
```


### 配置


#### command

**必需项**  
类型: `String|Function`

你想要运行的命令或者一个可以返回命令的函数。支持underscore模板。


### Options


#### stdout

默认值: `false`  
类型: `Boolean`

在终端中显示标准输出。


#### stderr

默认值: `false`  
类型: `Boolean`

在终端中显示标准错误。


#### stdin

默认值: `true`  
类型: `Boolean`

将终端的标准输入转发到命令中。


#### failOnError

默认值: `false`  
类型: `Boolean`

如果遇到错误则任务失败。如果你指定了一个`callback`回调函数，此选项失效。


#### callback(err, stdout, stderr, cb)

默认值: `function () {}`  
类型: `Function`

使用你自己的回调函数来覆盖默认的callback。

**切记在你完成后调用 `cb` 方法。**


#### execOptions

默认值: `undefined`  
接受值: Object

指定一些要传递给[.exec()](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)方法的选项:

- `cwd` String *子进程的当前工作目录*
- `env` Object *环境键值对*
- `setsid` Boolean
- `encoding` String *(默认值: 'utf8')*
- `timeout` Number *(默认值: 0)*
- `maxBuffer` Number *(默认值: 200\*1024)*
- `killSignal` String *(默认值: 'SIGTERM')*


## 使用许可

MIT © [Sindre Sorhus](http://sindresorhus.com)

