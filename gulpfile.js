var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-ruby-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    reactify = require('reactify'),
    gulpif = require('gulp-if'),
    del = require('del'),
    argv = require('yargs').argv;

var production = argv.production != undefined;

gulp.task('css', function() {
  return gulp.src('private/stylesheets/*.scss')
    .pipe(sass({
      style: 'compressed',
      loadPath: ['node_modules/bootstrap-sass/assets/stylesheets'],
      "sourcemap=none": true
    }))
    .pipe(autoprefix('last 2 version'))
    .pipe(gulpif(production, minifycss()))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('scripts', function() {
    return gulp.src('private/javascripts/*.js', {read: false})
        .pipe(browserify({
            transform: ['reactify'],
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task('watch', function() {
  gulp.watch("private/stylesheets/**", ['css']);
  gulp.watch("private/javascripts/**", ['scripts']);
});


gulp.task('clean', function(cb) {
    return del(['public/javascripts', 'public/stylesheets'], cb)
});

gulp.task('default', ['clean'], function() {
    return gulp.start('css', 'scripts');
});

gulp.task('heroku', function() {
    production = true;
    return gulp.start('default');
});
