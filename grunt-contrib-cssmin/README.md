
# grunt-contrib-cssmin v0.7.0

> 使用cssmin压缩css文件

## Getting Started

这个插件要求 Grunt 为 `0.4.0` 或以上版本。

如果你还不了解grunt，请查阅相关文档来了解什么是 Grunt [Grunt新手入门](http://www.gruntjs.org/article/getting_started.html)，比如如何创建 Gruntfile，如何配置 Grunt 任务，如何安装 Grunt 插件。

### 安装cssmin

	npm install grunt-contrib-cssmin --save-dev

安装好之后，可以在 Gruntfile 文件中使用如下方式载入cssmin插件:

	grunt.loadNpmTasks('grunt-contrib-cssmin');

也可以通过在 package.json 文件中配置插件依赖，然后使用 npm install 的方式统一安装所有依赖的插件。

该插件能够完美运行在 Grunt 0.4.x 版本，如果你还在使用 Grunt 0.3.x 的版本，建议您尽快升级 [怎样升级](http://gruntjs.com/upgrading-from-0.3-to-0.4)。


## Cssmin 任务

可以使用 `grunt cssmin` 命令来运行一个 cssmin 任务。

任务目标，需要压缩的文件以及其他配置选项可以在任务配置中指定，配置可参考 [任务配置说明](http://www.gruntjs.org/article/configuring_tasks.html) 。

另外，文件压缩是通过 [clean-css](https://github.com/GoalSmashers/clean-css) 实现。

## 配置选项

### banner

- 类型(Type): `String`
- 默认值: `Null`

用来生成注释并添加到压缩文件顶部。

### keepSpecialComments

- 类型(Type): `String` `Number`
- 默认值: `'*'`

此选项用来配置是否保留特殊注释，是 clean-css 提供的底层配置选项。

扩展：clean-css建议使用 `/*! ... */` 注释来代替 `/* ... */`。

- keepSpecialComments的默认值 `*` 表示保留所有通过 `/*! ... */` 书写的注释；
- 当设置值为 `1` 时只保留第一个通过 `/*! ... */` 书写的注释，
- 设置值为 `0` 时表示全都不保留。


### report 

- 可选择的值: `false` `min` `gzip`
- 默认值: `false`

report可以向我们展示文件压缩前后以及服务器端开启gzip压缩后的css文件大小，可以很直观的看出使用clean-css的效果。

- 默认值为 `false` ，表示不展示任何信息；
- 当设置为 `min` 时会展示css压缩前和压缩后的文件大小；
- 当设置为 `gzip` 时，会展示css文件压缩前后以及服务器端开启gzip后的css文件大小。
必须说明的是当设置为 `gzip` 时，会花费原来5-10倍的时间才能完成本次任务。

下面是report设置为gzip时的显示结果：

	Original: 198444 bytes.
	Minified: 101615 bytes.
	Gzipped:  20084 bytes.


## 示例

### 将两个css文件合并后压缩
	
	cssmin: {	// 任务名称
	  combine: {
	    files: {
	      'path/to/output.css': ['path/to/input_one.css', 'path/to/input_two.css']
	    }
	  }
	}

### 在生成的压缩文件顶部添加注释

	cssmin: {
	  add_banner: {
	    options: {
	      banner: '/* My minified css file */'
	    },
	    files: {
	      'path/to/output.css': ['path/to/**/*.css']	// 合并并压缩 path/to 目录下(包含子目录)的所有css文件
	    }
	  }
	}

### 压缩项目目录中的所有css文件，并一一生成对应的.min.css文件

	cssmin: {
	  minify: {
	    expand: true,		// 启用下面的选项
	    cwd: 'release/css/',	// 指定待压缩的文件路径
	    src: ['*.css', '!*.min.css'],	// 匹配相对于cwd目录下的所有css文件(排除以.min.css为后缀的所有文件)
	    dest: 'release/css/',	// 生成的压缩文件存放的路径
	    ext: '.min.css'		// 生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
	  }
	}
