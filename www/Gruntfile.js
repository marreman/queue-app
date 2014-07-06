
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'app/**/*.jsx'],
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
          'app/bundle.css': ['app/**/*.less', 'app/**/*.css']
        }
      },
      dist: {
        options: {
          compile: true,
          compress: true,
        },
        files: {
          'app/bundle.css': ['app/**/*.less', 'app/**/*.css']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-recess');

  grunt.registerTask('default', ['jshint', 'recess:lint']);

};
