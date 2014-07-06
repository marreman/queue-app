
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'app/**/*.jsx'],
      options: {
        jshintrc: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsxhint');

  grunt.registerTask('default', ['jshint']);

};
