# grunt-contrib-compress v0.6.0

> 压缩（打包）文件和文件夹


## 新手上路
本插件要求 Grunt `~0.4.0` （即0.4.x）版本。

如果你没有使用过 [Grunt](http://www.gruntjs.org/)，请先阅读[新手上路](http://www.gruntjs.org/article/getting_started.html)，这篇文章会讲解如何创建Gruntfile，如何安装Grunt插件。如果你已经熟悉了Grunt的流程，可以通过下面的命令安装本插件：

```shell
npm install grunt-contrib-compress --save-dev
```

安装完插件后就可以在Gruntfile中通过下面的JS语句启用插件了：

```js
grunt.loadNpmTasks('grunt-contrib-compress');
```

*本插件是为Grunt 0.4.x设计的，如果你还在用v0.3.x的话，强烈建议你[升级](http://www.gruntjs.org/article/grunt.html)。如果你因为某些原因无法升级的话，请使用[v0.3.2](https://github.com/gruntjs/grunt-contrib-compress/tree/grunt-0.3-stable)。*


## “压缩”任务

_使用`grunt compress`命令运行本任务_

任务的目标（target）、文件和选项的详细说明可参见[Grunt文档](http://www.gruntjs.org/article/configuring_tasks.html)。

本任务使用了以下Node库：
[archiver](https://github.com/ctalkington/node-archiver) (for zip/tar)
[zlib](http://nodejs.org/api/zlib.html#zlib_options) (for gzip).

### 选项(options)

#### archive
类型: `String` or `Function`
适用模式: `zip` `tar`

该参数用于定义压缩文档的输出位置。每个目标只能设置一个输出文件。

如果类型是函数，则该函数必须返回一个字符串。

*这个选项只适用于多文件压缩到一个文件的情况，比如压缩为zip或者tar文件。如果你要使用gzip压缩的话，请使用Grunt中标准的“源文件/目标文件”（src/dest）指定。*

#### mode
类型: `String`

用于定义使用哪种压缩模式，目前支持`gzip`, `deflate`, `deflateRaw`, `tar`, `tgz` (tar gzip) 和 `zip`.

对每一对源文件/目标文件，都会自动拉探测压缩模式，但也可以手动覆盖。

#### level
类型: `Integer`
适用模式: `zip`
默认值: 1

设置压缩级别。

*目前gzip压缩的级别不可用，因为node的zlib库中缺少相应的支持。*

#### pretty
类型: `Boolean`
默认值: `false`

输出记录时对文件大小进行格式化。

### 使用示例

```js
// 创建一个zip文件
compress: {
  main: {
    options: {
      archive: 'archive.zip'
    },
    files: [
      {src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // 包含路径中的文件
      {src: ['path/**'], dest: 'internal_folder2/'}, // 包含路径中的文件和子目录
      {expand: true, cwd: 'path/', src: ['**'], dest: 'internal_folder3/'}, // 使所有源文件相对于cwd
      {flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // 将结果扁平化，全部放在同一级目录
    ]
  }
}
```

```js
// 一对一gzip压缩
compress: {
  main: {
    options: {
      mode: 'gzip'
    },
    expand: true,
    cwd: 'assets/',
    src: ['**/*'],
    dest: 'public/'
  }
}
```

```js
// 扩展输出文件
compress: {
  main: {
    options: {
      mode: 'gzip'
    },
    files: [
      // src/目录中的每个文件都会被以.gz.js后缀输出到dist/目录中
      {expand: true, src: ['src/*.js'], dest: 'dist/', ext: '.gz.js'}
    ]
  }
}

```
```js
// 使用函数来返回输出文件名
compress: {
  main: {
    options: {
      archive: function () {
        // git.tag的值由其它的任务指定
        return git.tag + '.zip'
      }
    },
    files: [
      {expand: true, src: ['src/*.js'], dest: 'dist/'}
    ]
  }
}
```




## Release History

 * 2014-01-12   v0.6.0   Update archiver to v0.5.0
 * 2013-11-27   v0.5.3   Allow archive option to be a function.
 * 2013-06-03   v0.5.2   Allow custom extensions using the ext property.
 * 2013-05-28   v0.5.1   Avoid gzip on folders.
 * 2013-04-23   v0.5.0   Add support for deflate and deflateRaw.
 * 2013-04-15   v0.4.10   Fix issue where task finished before all data was compressed.
 * 2013-04-09   v0.4.9   Bump Archiver version.
 * 2013-04-07   v0.4.8   Open streams lazily to avoid too many open files.
 * 2013-04-01   v0.4.7   Pipe gzip to fix gzip issues. Add tests that undo compressed files to test.
 * 2013-03-25   v0.4.6   Fix node v0.8 compatibility issue with gzip.
 * 2013-03-20   v0.4.5   Update to archiver 0.4.1 Fix issue with gzip failing intermittently.
 * 2013-03-19   v0.4.4   Fixes for Node.js v0.10. Explicitly call grunt.file methods with map and filter.
 * 2013-03-14   v0.4.3   Fix for gzip; continue iteration on returning early.
 * 2013-03-13   v0.4.2   Refactor task like other contrib tasks. Fix gzip of multiple files. Remove unused dependencies.
 * 2013-02-22   v0.4.1   Pretty print compressed sizes. Logging each addition to a compressed file now only happens in verbose mode.
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-23   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-14   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Conversion to grunt v0.4 conventions. Replace basePath with cwd.
 * 2012-10-12   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-10-09   v0.3.1   Replace zipstream package with archiver.
 * 2012-09-24   v0.3.0   General cleanup. Options no longer accepted from global config key.
 * 2012-09-18   v0.2.2   Test refactoring. No valid source check. Automatic mode detection.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Chris Talkington](http://christalkington.com/)

*This file was generated on Sun Jan 12 2014 16:04:16.*
