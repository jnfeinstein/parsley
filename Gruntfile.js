module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      js: {
        files: [{
          expand: true,
          cwd: 'private/javascripts',
          src: ['**/*.js'],
          dest: 'public/javascripts',
          ext: '.min.js',
          extDot: 'first'
        }]
      },
      jsx: {
        files: [{
          expand: true,
          cwd: 'tmp/javascripts',
          src: ['**/*.js'],
          dest: 'public/javascripts',
          ext: '.min.js',
          extDot: 'first'
        }]
      },
      vendor: {
        files: {
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'private/stylesheets',
          cssDir: 'public/stylesheets'
        }
      }
    },
    watch: {
      stylesheets: {
        files: ['private/stylesheets/**/*.scss'],
        tasks: ['compass']
      },
      javascripts: {
        files: ['private/javascripts/**/*.js'],
        tasks: ['uglify']
      },
      jsx: {
        files: ['private/javascripts/**/*.jsx'],
        tasks: ['react']
      }
    },
    react: {
      single_file_output: {
        files: [{
          expand: true,
          cwd: 'private/javascripts',
          src: ['**/*.jsx'],
          dest: 'tmp/javascripts',
          ext: '.js',
          extDot: 'first'
        }]
      }
    },
    clean: [
      'tmp',
      'public/javascripts/**/*.min.js',
      'public/javascripts/**/*.map',
      'public/stylesheets/**/*.css'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('default', ['clean', 'react', 'uglify', 'compass']);
  grunt.registerTask('heroku', ['clean', 'uglify', 'compass']);

};