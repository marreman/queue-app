
module.exports = function(grunt) {

  var files = {
    js: 'www/app/src/**/*.js',
    jsx: 'www/app/src/**/*.jsx',
    css: 'www/app/src/**/*.css',
    less: 'www/app/src/**/*.less'
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'www/app/dist/bundle.js': ['www/app/src/app.js'],
        },
        options: {
          transform: ['reactify'],
          bundleOptions: {
            debug: true
          }
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', files.js, files.jsx],
      options: {
        jshintrc: true
      }
    },

    recess: {
      dist: {
        options: {
          compile: true
        },
        files: {
          'www/app/dist/bundle.css': [files.css, files.less]
        }
      },
      lint: {
        options: {
          compile: false,
          noIDs: true,
          noJSPrefix: true,
          noOverqualifying: true,
          noUnderscores: true,
          noUniversalSelectors: true,
          prefixWhitespace: true,
          strictPropertyOrder: true,
          zeroUnits: true
        },
        files: {
          'www/app/dist/bundle.css': [files.css, files.less]
        }
      }

    },

    watch: {
      scripts: {
        files: [files.js, files.jsx, files.css, files.less],
        tasks: ['recess:dist', 'browserify:dist'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['recess:lint', 'jshint']);
  grunt.registerTask('test', ['browserify:dist', 'jasmine:test']);

};
