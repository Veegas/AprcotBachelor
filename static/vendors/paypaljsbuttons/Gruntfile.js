module.exports = function (grunt) {

	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		meta: {
			banner: "/*!\n * <%= pkg.name %>\n * <%= pkg.description %>\n * @version <%= pkg.version %> - <%= grunt.template.today(\'yyyy-mm-dd\') %>\n * @author <%= pkg.author.name %> <<%= pkg.author.url %>>\n */\n"
		},

		jshint: {
			all: {
				src: ["src/*.js", "test/spec/*.js"],
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},

		uglify: {
			dist: {
				src: [ "<%= meta.banner %>", "src/paypal-button.js" ],
				dest: "dist/paypal-button.min.js",
				options: {
					banner: "<%= meta.banner %>"
				}
			}
		},

		mochaTest: {
			all: {
				options: {
					reporter: "spec"
				},
				src: ["test/spec/*.js"]
			}
		}
	});

	// Load grunt tasks from npm packages
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-mocha-test");

	grunt.registerTask("default", ["jshint", "uglify"]);
	grunt.registerTask("test", ["jshint", "mochaTest"]);

};
