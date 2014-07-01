# grunt-contrib-watch

> 执行预定义的任务时监控文件的变化，比如添加，修改，删除。

## Getting Started

这个插件要求 Grunt 的版本大于或等于 ）0.4.0 (`~0.4.0`)

安装：

    npm install grunt-contrib-watch --save-dev

使用：

    grunt.loadNpmTasks('grunt-contrib-watch');
    
## 监控任务

*使用 `grunt watch` 命令运行这个任务*。

### 设置

下面有一系列的可用选项。minimatch 选项查看[这里](https://github.com/isaacs/minimatch#options)。下面还有一些附加选项。

**files**

- 类型：`String` | `Array`

定义监控的文件的匹配模式。可以是一个字符串或者文件列表数组，或者是 minimatch 模式。

**tasks**

- 类型：`String` | `Array`

定义监控的文件变化时运行哪个任务。

**options.spawn**

- 类型：`Boolean`
- 默认值： `true`

无论 spawn 任务是否运行在子进程。设置这个选项为 `false` 来加速监控的反映时间(通常大多数情下快于 500ms)，并且允许后面的任务运行共享同样的环境。非 spawning 任务运行可能会使 watch 任务更容易失败，因此建议根据需要而使用。

Example：

```javascript
watch: {
    scripts: {
        files: ['**、*.js'],
        tasks: ['jshint'],
        options: {
            spawn: false
        }
    }
}
```
*对于向后兼容的选项 `nospawn` 任然时可用的，与 `spawn` 的作用相反*。

**options.interrupt**

- 类型：`Boolean`
- 默认值：`false`

如同 watch 任务的文件修改有 spawn 任务就会在子进程中完成。默认行为在上一个进程结束的时候仅仅生成一个新的子进程，针对每个目标。设置 `innterrupt` 选项为 `true` 来终止上一个进程，然后针对之后的变化生成一个新的。

Example：

```javascript
watch: {
    scripts: {
        files: '**/*.js',
        tasks: ['jshint'],
        options: {
            interrupt: true
        }
    }
}
```

**options.debounceDelay**

- 类型：`Interger`
- 默认值：500

在连续发射时间之前针对同样的文件路径和状态等待多久。比如，如果你的 `Gruntfile.js` 发生了变化，那么一个 `changed` 时间就只会在给定毫秒数之后才会再次触发。

Example：

```javascript
watch: {
    scripts: {
        files: '**/*.js',
        tasks: ['jshint'],
        options: {
            debounceDelay: 250
        }
    }
}
```

**options.interval**

- 类型：`Integer`
- 默认值：100

`interval` 是传递给 `fs.watchFile` 的。由于 `interval` 只能用于 `fs.watchFile`，并且这个 watcher 也是使用 `fs.watch` 的；并且它推荐忽略这个选项。默认为 *100ms*。

**options.event**

- 类型：`String` | `Array`
- 默认值：`all`

指定触发指定任务的监控事件类型。这个选项可以是一个，也可以是多个：`all`, `changed`, `added` 和 `deleted`。

Example：

```javascript
watch: {
    scripts: {
        files: '**/*.js',
        tasks: ['generateFileManifest'],
        options: {
            event: ['added', 'deleted']
        }
    }
}
```
**options.forever**

- 类型：`Boolean`
- 默认值：`true`

这只是一个任务级别的选项，并不能对每个目标进行配置。默认情况下监控任务会绕过 `grunt.fatal` 和 `grunt.warn` 试图并组织他们从监控进程中退出。如果你还是希望使用 `grunt.fatal` 和 `grunt.warn`，那么可以将 `forever` 选项设置为 `false` 来覆盖默认设置

**options.dateFormat**

- 类型：`Function`

这个选项也只是一个任务级别的选项，并且也不能够对每个任务目标进行配置。默认情况下当监控任务完成任务运行时会显示 `Completed in 1.301s at Thu Jul 18 2013 14:58:21 GMT-0700 (PDT) - Waiting....` 信息。可以通过使用自定义的方法来覆盖这个默认信息。

```javascript
watch: {
    options: {
        dateFormat: function(time) {
            grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
            grunt.log.writeln('Waiting for more changes...');
        }
    }
    scripts: {
        files: '**/*.js',
        tasks: 'jshint',
    }
}
```
**options.atBegin**

- 类型：`Boolean`
- 默认值：`false`

这个选项在启动监控任务的时候触发运行每个指定的任务。

**options.livereload**

- 类型：`Boolean|Number|Object`
- 默认值：`false`

设置为 `true` 或者 `livereload: 1337` 来指定端口用来启用 live realod (实时重载). 默认并且推荐指定端口为 `35729`。

如果启用了实时重载，服务器就会对监控任务的每个目标开始进行监控。在指定的任务运行之后，文件修改就会触发实时重载任务：

Example：

```javascript
watch: {
    css: {
        files: '**/*.sass',
        tasks: ['sass'],
        options: {
            livereload: true,
        }
    }
}
```
可能需要使用 https 连接来使用 liverealod 任务。只需要给 `livereload` 对象传递一个对象并带有指定的 `key` 和 `cert` 路径就可以做到。

Example:

```javascript
watch: {
  css: {
    files: '**/*.sass',
    tasks: ['sass'],
    options: {
      livereload: {
        port: 9000,
        key: grunt.file.read('path/to/ssl.key'),
        cert: grunt.file.read('path/to/ssl.crt')
        // you can pass in any other options you'd like to the https server, as listed here: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
      }
    },
  },
},
```

**options.cwd**

- 类型：`String|Object`
- 默认值：`process.cwd()`

这个选项能够用来设置当前工作目录。默认为 `process.cwd()`。也可以是一个字符串用来设置 cwd 匹配文件和 spawn 任务。或者是使用一个对象来单独的设置。比如：`options: { cwd: { files: 'match/files/from/here', spawn: 'but/spawn/files/from/here' } }`。

### 示例：

```javascript
// Simple config to run jshint any time a file is added, changed or deleted
grunt.initConfig({
  watch: {
    files: ['**/*'],
    tasks: ['jshint'],
  },
});
```

```javascript
// Advanced config. Run specific tasks when specific files are added, changed or deleted.
grunt.initConfig({
  watch: {
    gruntfile: {
      files: 'Gruntfile.js',
      tasks: ['jshint:gruntfile'],
    },
    src: {
      files: ['lib/*.js', 'css/**/*.scss', '!lib/dontwatch.js'],
      tasks: ['default'],
    },
    test: {
      files: '<%= jshint.test.src %>',
      tasks: ['jshint:test', 'qunit'],
    },
  },
});
```

**使用 `watch` 事件**

下面的任务会在监控的文件修改之后触发一个 `watch` 事件。如果你希望文件编辑修改之后给一个简单的提示信息或者结合其他任务使用这个任务，那么这个功能就非常有用了。下面是一个简单的使用 `watch` 事件的示例：

```javascript
grunt.initConfig({
  watch: {
    scripts: {
      files: ['lib/*.js'],
    },
  },
});
grunt.event.on('watch', function(action, filepath, target) {
  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
});
```

注意：`watch` 事件并没有打算替换配置和运行任务的标准 Grunt API。如果你想使用 `watch` 事件来运行任务，那么就可能搞错误了。先阅读一下[任务配置](http://gruntjs.com/configuring-tasks)文档。

**根据需要编译文件**

一个非常常见的需求就是只在需要的时候编译文件。下面有一个例子，演示了仅仅使用 `jshint` 任务校验变化过的文件：

```javascript
grunt.initConfig({
  watch: {
    scripts: {
      files: ['lib/*.js'],
      tasks: ['jshint'],
      options: {
        spawn: false,
      },
    },
  },
  jshint: {
    all: {
      src: ['lib/*.js'],
    },
  },
});
```
如果需要动态的修改配置，那么就必须启用 `spawn` 选项以保证监控任务基于相同的环境运行。

可以选择一个更可靠的方式来处理同时保存多个文件的情况：

```javascript
var changedFiles = Object.create(null);
var onChange = grunt.util._.debounce(function() {
  grunt.config('jshint.all.src', Object.keys(changedFiles));
  changedFiles = Object.create(null);
}, 200);
grunt.event.on('watch', function(action, filepath) {
  changedFiles[filepath] = action;
  onChange();
});
```

**实时重载**

实时重来是 `wacth` 任务内置的。设置 `livereload` 选项为 `true` 来启用默认的端口 `35729` 或者也可以自定义端口 `livereload: 1337`。

想要给所有监控的目标添加实时重载最简单的方法就是在任务级别设置 `livereload` 选项为 `true`。这样就只会运行一个实时重在服务器，并且所有监控的目标都能触发实时重载：

```javascript
grunt.initConfig({
  watch: {
    options: {
      livereload: true,
    },
    css: {
      files: ['public/scss/*.scss'],
      tasks: ['compass'],
    },
  },
});
```
也可以单独针对监控目标配置实时重载，或者运行多个实时重载服务器。也可以使用不同的端口来启动多个不同的实时重载服务器。

```javascript
grunt.initConfig({
  watch: {
    css: {
      files: ['public/scss/*.scss'],
      tasks: ['compass'],
      options: {
        // Start a live reload server on the default port 35729
        livereload: true,
      },
    },
    another: {
      files: ['lib/*.js'],
      tasks: ['anothertask'],
      options: {
        // Start another live reload server on port 1337
        livereload: 1337,
      },
    },
    dont: {
      files: ['other/stuff/*'],
      tasks: ['dostuff'],
    },
  },
});
```
**在 HTML 中启用实时重载**

一旦启动了一个实时重载服务器，就可以访问到实时重载脚本。也可以通过添加一个 `livereload.js` 脚本在 `</body>` 之前的方式在 Web 页面中启用实时重载任务。

```html
<script src="//localhost:35729/livereload.js"></script>
```
可以随意将这个脚本添加到模板中，并且可以切换使用某些 `dev` 标志。

**使用 Live Reload 浏览器扩展**

除了添加实时重载脚本到页面中的方式，也可以通过安装浏览器扩展的方式使用实时重载。请阅读[如何安装和使用浏览器扩展](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)一文来了解如何在浏览器中安装扩展。

一旦安装完成之后请使用默认的实时重载端口 `35729`，同时浏览器回自动重载你的 Web 页面而不需要使用 `<script>` 标签引入实时重载脚本。

**使用connect中间件**

由于实时重载一般都是在开发阶段使用，你可能希望在构建生产时禁用它(或者说禁用浏览器扩展)。一种常用的方式就是使用连接中间件注入脚本到页面中。可以尝试使用 [connect-livereload](https://github.com/intesso/connect-livereload) 中间件来将实时重载脚本注入到页面中。

**自己手动启动实时重载**

使用 [tiny-lr](https://github.com/mklabs/tiny-lr) 创建自己的实时重载非常容易。鼓励先预读以下 `tiny-lr` 的文档。如果你喜欢自己来触发实时重载服务器，只需访问：`http://localhost:35729/changed` URL就行了 (POST)。或者你项构造自己的实时重载实现，可以参考下面的例子：

```javascript
// 创建一个实时重载的服务器示例
var lrserver = require('tiny-lr')();
// 监听指定的 35729 端口
lrserver.listen(35729, function(err) { console.log('LR Server Started'); });
// 然后运行这个文件或者请求 localhost:35279/changed 就行了
lrserver.changed({body:{files:['public/css/changed.css']}});
```
> 使用 Node.js 的方式

**Live Reload 与预处理器**

任何时候编辑一个启用 `liverealod` 选项的监控的文件，文件都会发送到 live reload 服务器。有些诸如使用预处理器的文件(`sass`, `less`, `coffeescript` 等等)可能也希望能够自动发送编辑修改后的文件给 live reload 服务器。让这些不能被浏览器直接识别的文件也能触发重载整个页面，而不仅仅是 `css` 和 `javascript`。

解决方案就是将 `liverealod` 监控的目标指向目标文件 (编译生成的文件)：

```javascript
grunt.initConfig({
  sass: {
    dev: {
      src: ['src/sass/*.sass'],
      dest: 'dest/css/index.css',
    },
  },
  watch: {
    sass: {
      // 默认监控和编译sass文件，但是不触发实时重载
      files: ['src/sass/*.sass'],
      tasks: ['sass'],
    },
    livereload: {
      // 这里监控 sass 任务，并且将编译后的文件发送到服务器
      options: { livereload: true },
      files: ['dest/**/*'],
    },
  },
});
```

## 常见问题

**如何解决错误诸如：`EMFILE: Too many opened files.` ？**

这是因为你的系统有最大文件打开数目限制。对于 OSX 系统默认非常少 (256)。可以临时使用 `ulimit -n 10480` 增加限制数，指定的数字就是新的最大限制数了。

在某些版本的 OSX 系统中上面的方式可能不行。这种情况下可以尝试使用 `lanunchctl limit maxfiles 10480 10480`命令并重启终端。更多信息请查看[官方文档](http://superuser.com/questions/261023/how-to-change-default-ulimit-values-in-mac-os-x-10-6)。

**我可以在 Grunt 0.3 中使用 wacth 插件吗？**

`grunt-contrib-watch@0.1.x` 是兼容 Grunt v0.3 的，但是还是强烈推荐升级 Grunt 后使用。

**为什么监控任务吃掉了我所有的内存/CPU？**

可能使用了牛逼的文件匹配模式监控着成千上万 的文件。比如使用 `'**/*.js'` 的方式，但是又忘记使用 `'!**/node_modules/**'` 来排除 `node_modules` 目录啦。在处理子目录中文件的时候注意使用靠谱的模式尽量精确的匹配更少的文件。

另外一种原因也可能是频繁的监控大量的文件导致。尝试使用 `options: { interval: 5007 } ` 来控制频繁的监控。查看官方 [#35](https://github.com/gruntjs/grunt-contrib-watch/issues/145) 和 [#145](https://github.com/gruntjs/grunt-contrib-watch/issues/145) 可以找到更多信息。

**为什么 spawn 默认是使用子进程的？**

监控任务的终极目标是变化后的文件，这是用户自己触发任务运行的。每次用户运行一个 `grunt` 都会生成一个进程，同时任务也是连续运行的。为了保持一致的体验，并且达到与其的结果，监控任务就默认生成一个子进程来跑任务。

任务运行在沙箱里面也能够让监控任务长时间保持稳定。这样也就能够处理更复杂的任务和文件结构。

生成子进程的方式也确实能够拖慢性能 (大多数的环境通常都是 500 ms)。这也削弱了任务每次运行都依赖于共享上下文环境的能力 (比如重载任务)。如果你想更快的执行监控任务或者希望更高的共享上下文环境可以设置 `spawn` 选项为 `false`。要知道，启用这个选项可能让监控任务更容易失败。

