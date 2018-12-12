'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    var appConfig = {
        // app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };


    grunt.initConfig({
        watch: {
            less: {
                files: ['client/assets/less/**/*.less', 'client/app_config/layout/layout.less', 'client/app_config/theme/theme.less', 'client/mod_idn/assets/less/**/*.less', ],
                tasks: ['less']
            },
            sass: {
                files: ['client/mod_nbos/assets/sass/**/*.scss'],
                tasks: ['sass']
            }
        },
        jshint: {
            ignore_warning: {
                options: {
                    '-W015': true,
                    reporter: require("jshint-junit-reporter"),
                    reporterOutput: 'BuildReports/Quality/jshint.xml'
                },
                src: ['client/mod_app/**/*.js']
            }

        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            startdev: {
                tasks: [
                    'watch:less',
                    'execute:devserver'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        //For Express
        execute: {
            devserver: {
                options: { 
				    args: ['--env', 'dev']
			    },
                src: ['server.js']
            },
            prodserver: {
                options: { 
				    args: ['--env', 'prod']
			    },
                src: ['server.js']
            }
        },
        //For Less
        less: {
            compile: {
                files: {
                    'client/assets/css/appStyles.css': 'client/assets/less/MAIN.less'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'client/assets/css/console.css': 'client/mod_nbos/assets/sass/console.scss'
                }
            }
        }
    });

    grunt.registerTask('express_dev', function () {
        grunt.task.run(['less', 'sass', 'concurrent:startdev']);
    });
    
    grunt.registerTask('express_prod', function () {
        grunt.task.run(['execute:prodserver']);
    });
}