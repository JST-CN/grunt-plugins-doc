module.exports = function(grunt){
    'use strict';

    //define the add template task
    grunt.registerTask('addTemplate', 'copy the template to target folder', function(){
        var target = grunt.option('target');
        if ( target ) {
            grunt.config.set('plugin.name', target);
            grunt.task.run('copy:template');
        } else {
            grunt.fail.warn("Please append '--target=' to pass an valid pluginname!");
        }
    });
}


