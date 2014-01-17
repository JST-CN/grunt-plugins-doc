grunt-plugins-doc
=================

**关于 Grunt**

- [Grunt 中文社区](http://gruntjs.org/)

中文社区目前只提供了中文档翻译，与 Grunt 0.4.x版本对应。及个别更新的地方可能未及时对齐版本。

- [Grunt 英文官网](http://gruntjs.com/)

官方网站提供了最新的文档信息，以及官方维护的插件列表和收录到官网中的插件列表。

Grunt 中文 QQ 群：16613475

**关于插件文档**

Grunt 常用插件中文文档。本文档由网友贡献。

> 以 `grunt-contrib-` 前缀开头的文档均是由官方维护的插件。

**添加新的插件到该Repo**

请按照如下操作添加新的插件文档到本代码库。

1.运行如下命令安装所需任务依赖。

```
npm install
```

> 基于目前的任务现状，只有极少数的任务插件需要被安装。

2.运行如下命令添加想要贡献的插件文件夹。

```
grunt addplugin --target=grunt-contrib-cssmin
```

> 以上命令以添加grunt-contrib-cssmin为例，其他插件请参照上例。

正常情况下得到如下输出(以windows平台输出为例)

```
Running "getRepo" task
start to check grunt-contrib-cssmin from npm.
>> the repository is git://github.com/gruntjs/grunt-contrib-cssmin.git

Running "submoduleAdd" task
Start to add submodule https://github.com/gruntjs/grunt-contrib-cssmin.git for grunt-contrib-cssmin
>> Git add submodule done!

Running "gitmodulesAdd" task
>> git add .gitmodules done!

Running "submoduleCommit" task
>> git commit submodule done!

Running "submoduleInit" task
>> git submodule init done!

Running "addTemplate" task

Running "copy:template" (copy) task
Created 4 directories, copied 1 files

Done, without errors.

```

添加完毕后，插件目录结构如下示：

> 此结构以grunt-contrib-cssmin为例，original目录下为原插件目录结构，故各插件有所不同。

```
GRUNT-CONTRIB-CSSMIN
├─annotated
├─original
│  ├─docs
│  ├─tasks
│  └─test
│      ├─expected
│      └─fixtures
│          └─inner
├─sample
└─translation

```

**template各文件及文件夹说明**

_sample_ : 用来存放各种使用该插件的样例文件及说明。

_original_ : 以submodule的形式将原插件的代码库绑定到该目录。

_annotated_ : 用来存放使用docco插件生成的带注解的源码html文件。

_translation_ : 用来存放将原插件所有文档的翻译文件。

_README.md_ : 为了方便大多数人操作，将README.md文件从translation目录中抽取到插件根目录下，对应翻译英文的README.md。


