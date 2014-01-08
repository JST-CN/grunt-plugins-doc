module.exports = function(grunt){
    'use strict';

    var path = require('path');

    //define the add task
    grunt.registerTask('submoduleAdd', 'git submodule add the plugin repository ', function(){
        var done = this.async(),
            args = [],
            target = grunt.option('target'),
            repository = grunt.option('targetRepository').toString().replace("git://","https://");

        grunt.log.writeln("Start to add submodule " + repository + " for " + target);

        if (target && repository){
            // replace the slash to avoid the exception by git command
            var target_folder = path.join(target, grunt.config.get("original_folder")).replace("\\","/");
            args = ['submodule', 'add', repository, target_folder];
            // git submodule add repository the/original folder/path
            grunt.util.spawn({
                cmd: 'git',
                args: args
            },function(error, result, code){
                if (error){
                    grunt.log.error(result);
                    done(false);
                } else {
                    grunt.log.ok("Git add submodule done!");
                    done(true);
                }
            });
        } else {
            grunt.log.error('Please enter an valid Git address of Grunt Plugin Repo, then try it again!');
            done(false);
        }
    });

    grunt.registerTask('submoduleInit', 'git submodule init ', function(){
        var done = this.async();
        var args = ['submodule', 'init'];
        grunt.util.spawn({
            cmd: 'git',
            args: args
        }, function(error, result, code){
            if(error){
                grunt.log.error(result);
                done(false);
            } else {
                grunt.log.ok("git submodule init done!");
                done(true);
            }
        });
    });

    grunt.registerTask('gitmodulesAdd', 'git add .gitmodules the/original folder/path', function(){
        var done = this.async();
        var target_folder = path.join(grunt.option("target"), grunt.config.get("original_folder"));
        var args = ['add', '.gitmodules', target_folder];
        grunt.util.spawn({
            cmd: 'git',
            args: args
        }, function(error, result, code){
            if(error){
                grunt.log.error(result);
                done(false);
            } else {
                grunt.log.ok("git add .gitmodules done!");
                done(true);
            }
        });
    });

    grunt.registerTask('submoduleUpdate', 'git submodule update', function(){
        var done = this.async();
        var args = ['submodule', 'update'];
        grunt.util.spawn({
            cmd: 'git',
            args: args
        }, function(error, result, code){
            if(error){
                grunt.log.error(result);
                done(false);
            } else {
                grunt.log.ok("git submodule update done!");
                done(true);
            }
        });
    });

    grunt.registerTask('submoduleCommit', 'git commit', function(){
        var done = this.async();
        var args = ['commit', '-m', 'Add Submodule into version control'];
        grunt.util.spawn({
            cmd: 'git',
            args: args
        }, function(error, result, code){
            if(error){
                grunt.log.error(result);
                done(false);
            } else {
                grunt.log.ok("git commit submodule done!");
                done(true);
            }
        });
    });

    // used to add new submodule for plugin
    grunt.registerTask('addSubmodule', ['submoduleAdd', 'gitmodulesAdd', 'submoduleCommit', 'submoduleInit']);

}
