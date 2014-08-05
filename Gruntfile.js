/*
 * @description
 *   Please write the Gruntfile.js.js script's description
 * @author rdshoep(rdshoep@126.com)
 *   http://www.rdshoep.com/
 * @version 
 *   1.0.0(2014/8/5)
 */

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {

        },
        copy: {
            main: {
                src: "src/logger.js",
                dest: "build/logger.js"
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %>*/\n'
            },
            build: {
                src: "build/logger.js",
                dest: "build/logger.min.js"
            }
        }
    });

    require("load-grunt-tasks")(grunt);

    grunt.registerTask("default", ["copy", "uglify"]);
};