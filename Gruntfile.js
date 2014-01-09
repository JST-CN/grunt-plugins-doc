'use strict';

module.exports = function(grunt) {
    //Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // translation progress log file
        translate_folder : 'translate',
        original_folder : 'original',
        template_folder : 'template',
        annotated_folder : 'annotated',
        // generate annotate source code
        docco : {
            annotate : {
                src:["<%= plugin.name %>/**/*.js"],
                options: {
                    output : "<%= annotated_folder %>/"
                }
            }
        },

        copy : {
            template : {
                expand : true,
                src: ["**","**/.*"],
                dest: "<%= plugin.name %>/",
                cwd: "<%= template_folder %>/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-docco');
    // load local tasks
    grunt.loadTasks('tasks');

    // used to add new plugin to this repo at first time
    grunt.registerTask('addplugin', ['getRepo', 'addSubmodule', 'addTemplate']);

    // used to generated the annotated source code

};
