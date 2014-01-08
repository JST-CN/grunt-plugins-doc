module.exports = function(grunt){
    'use strict';

    //define the add task
    grunt.registerTask('getRepo', 'get the field repository.url of plugin from npm', function(){
        var done = this.async();
        var target = grunt.option('target');
        if (!target) {
            grunt.log.error('Please enter an valid Git address of Grunt Plugin Repo, then try it again!');
            done(false);
        } else {
            grunt.log.writeln("start to check " + target + " from npm.");
        }

        var args = ['view'];
        args.push(target);
        args.push('repository.url');
        //npm view grunt-clean repository
        grunt.util.spawn({
            cmd: 'npm',
            args: args
        },function(error, result, code){
            if (error) {
                done(false);
                grunt.log.error(code);
            } else {
                // add the repository to option and share it with other tasks
                grunt.log.ok('the repository is ' + result);
                grunt.option('targetRepository', result);
                done(true);
            }
        });
    });
}

