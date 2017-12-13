var gulp = require("gulp");
var uglify = require("gulp-uglify");
var csso = require('gulp-csso');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['styles'], function() {
  browserSync.init({
    server: './',
    port: '8080'
  });
});

gulp.task('compress', function() {
  gulp.src('js/*.js')
  .pipe(uglify())
  .on('error', console.error.bind(console))
  .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
  gulp.src('css/*.css')
  .pipe(csso())
  .on('error', console.error.bind(console))
  .pipe(gulp.dest('mincss'))
  .pipe(browserSync.stream());
});

gulp.task('default', ['compress', 'styles', 'watch', 'serve']);

//Gulp watch task
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['compress']);
  gulp.watch('css/*.css', ['styles']);
});