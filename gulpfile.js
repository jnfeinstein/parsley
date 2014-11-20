var gulp = require('gulp'),
    compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    minifycss = require('gulp-minify-css'),
    reactify = require('reactify'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    del = require('del'),
    argv = require('yargs').argv;

var production = argv.production != undefined;

gulp.task('stylesheets', function() {
  return gulp.src('private/stylesheets/*.css')
    .pipe(gulpif(production, minifycss()))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('compass', function() {
  return gulp.src('private/stylesheets/*.scss')
    .pipe(compass({
        css: "public/stylesheets",
        sass: "private/stylesheets",
        sourcemap: true
    }))
    .pipe(gulpif(production, minifycss()))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('scripts', function() {
    return gulp.src('private/javascripts/**/*.js', {read: false})
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task('react', function() {
    return gulp.src('private/javascripts/**/*.jsx', {read: false})
        .pipe(browserify({
            transform: ['reactify'],
            insertGlobals: true,
            debug: true
        }))
        .pipe(rename({extname: '.js'}))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task('watch', function() {
  gulp.watch("private/stylesheets/**", ['stylesheets', 'compass']);
  gulp.watch("private/javascripts/**", ['scripts', 'react']);
});


gulp.task('clean', function(cb) {
    return del(['public/javascripts', 'public/stylesheets'], cb)
});

gulp.task('default', ['clean'], function() {
    return gulp.start('stylesheets', 'compass', 'scripts', 'react');
});

gulp.task('heroku', function() {
    production = true;
    return gulp.start('default');
});
