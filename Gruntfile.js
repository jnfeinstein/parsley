module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        sourceMap: true
      },
      files: {
        expand: true,     // Enable dynamic expansion.
        cwd: 'private/javascripts',      // Src matches are relative to this path.
        src: ['**/*.js'], // Actual pattern(s) to match.
        dest: 'public/javascripts',   // Destination path prefix.
        ext: '.min.js',   // Dest filepaths will have this extension.
        extDot: 'first'   // Extensions in filenames begin after the first dot
      },
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
      }
    },
    clean: [
      'public/javascripts/**/*.min.js',
      'public/javascripts/**/*.map',
      'public/stylesheets/**/*.css'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'uglify', 'compass']);
  grunt.registerTask('heroku', ['clean', 'uglify', 'compass']);

};