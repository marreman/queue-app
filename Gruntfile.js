
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'www/app/src/**/*.js', 'www/app/src/**/*.jsx'],
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
          'www/app/bundle.css': ['www/app/src/**/*.less', 'www/app/src/**/*.css']
        }
      },
      dist: {
        options: {
          compile: true
        },
        files: {
          'www/app/dist/bundle.css': ['www/app/src/**/*.less', 'www/app/src/**/*.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['www/app/src/**/*.css', 'www/app/src/**/*.less'],
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
