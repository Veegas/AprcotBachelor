/*jslint node: true */
'use strict';

// load all grunt tasks
// Project configuration.
module.exports = function(grunt) {
    var jsFiles = [
            'GruntFile.js',
            'static/*.js',
            'static/app/*.js',
            'static/app/**/*.js',
            'static/app/**/**/*.js',
            'static/app/**/**/**/*.js',
            'static/app/**/**/**/**/*.js'
        ],
        lessFiles = [
            'static/app/**/*.less',
        ],
        htmlFiles = [
            'static/app/**/*.less',
            'static/app/*.html',
        ],
        pyFiles = [
            'src/*.py',
            'src/**/*.py',
            'src/**/**/*.py',
            'src/**/**/**/*.py'
        ];

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            files: [jsFiles, lessFiles, htmlFiles],
            tasks: ['less', 'jshint', 'jsbeautifier:main']
        },
        less: {
            development: {
                options: {
                    paths: ['css/']
                },
                files: {
                    'static/assets/css/main.css': lessFiles
                }
            }
        },
        jscs: {
            src: jsFiles,
            options: {
                config: '.jscsrc'
            }
        },
        flake8: {
            options: {
                maxLineLength: 120,
                maxComplexity: 10,
                force: true,
                // format: 'pylint',
                quiet: true
            },
            src: pyFiles
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: jsFiles,
        },
        jsbeautifier: {
            main: {
                src: [jsFiles, htmlFiles],
                options: {
                    html: {
                        braceStyle: "collapse",
                        indentChar: " ",
                        indentScripts: "keep",
                        indentSize: 4,
                        maxPreserveNewlines: 10,
                        preserveNewlines: true,
                        unformatted: ["a", "sub", "sup", "b", "i", "u"],
                        wrapLineLength: 0
                    },
                }
            }
        }
    });
    // grunt.registerTask('beauty', ['jsbeautifier:main']);
    grunt.registerTask('default', ['watch']);
};
