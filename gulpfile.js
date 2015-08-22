var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');

// Minify CSS for project
gulp.task('style', function() {
    return gulp.src( 'css/*.css' )
        .pipe( minifyCSS() )
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

// Uglify JavaScript Files - Remove Spaces
gulp.task('script', function() {
  return gulp
      .src('js/*.js')
      .pipe(uglify())
      .pipe(jshint())
      .pipe(rename({
        suffix: '.min'}))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['style', 'script']);

//gulp.task('default', ['delete', 'style', 'script', 'watch']);
/*
gulp.task('delete', function() {
    del(['assets/*'], function (err) {
        console.log('Files deleted');
  });
});

gulp.task('watch', function() {
  gulp.watch('css/style.css', ['style']);
  gulp.watch('js/script.js', ['script']);
});

gulp.task('script', function() {
  return gulp
    .src('js/script.js')
    .pipe(plumber())            // add plumber
    .pipe(uglify())
    .pipe(jshint())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets'));
});*/
