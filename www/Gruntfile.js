
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/src/**/*.js', 'app/src/**/*.jsx'],
      options: {
        jshintrc: true
      }
    },

    recess: {
      lint: {
        options: {
          compile: false,
          compress: false,
          noIDs: true,
          noJSPrefix: true,
          noOverqualifying: true,
          noUnderscores: true,
          noUniversalSelectors: true,
          prefixWhitespace: true,
          strictPropertyOrder: true,
          zeroUnits: true,
        },
        files: {
          'app/bundle.css': ['app/src/**/*.less', 'app/src/**/*.css']
        }
      },
      dist: {
        options: {
          compile: true
        },
        files: {
          'app/dist/bundle.css': ['app/src/**/*.less', 'app/src/**/*.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['app/src/**/*.css', 'app/src/**/*.less'],
        tasks: ['recess:dist'],
        options: {
          spawn: false,
        },
      },
    }

  });

  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'recess:lint']);

};
