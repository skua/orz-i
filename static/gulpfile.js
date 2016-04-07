var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sequence = require('run-sequence');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var insert = require('gulp-insert');
var minify = require('gulp-minify-css');


// for dist should be dist
var target = 'tmp/';

/**
 * clean tmp and dist
 */
gulp.task('clean', function () {
  return gulp.src(['tmp', 'dist'], {
    read: false
  }).pipe(clean());
});

// move css files
gulp.task('movecss', function () {
  return gulp.src(['src/css/**/*'], {
    base: 'src'
  }).pipe(insert.prepend('/*! https://orz-i.com */')).pipe(gulp.dest(target)).pipe(connect.reload());
});


// move js files
gulp.task('movejs', function () {
  return gulp.src(['src/js/**/*'], {
    base: 'src'
  }).pipe(gulp.dest(target)).pipe(connect.reload());
});


// minify css
gulp.task('minify:css', function () {
  return gulp.src(target + '/css/**/*')
    .pipe(minify({
      advanced: false
    }))
    .pipe(gulp.dest(target + '/css'))
    .pipe(connect.reload());
});

// uglify js
gulp.task('uglify:js', function () {
  return gulp.src(['src/js/**/*'], {
    base: 'src'
  }).pipe(uglify()).pipe(gulp.dest(target));
});

 

// Default task clean temporaries directories and launch the main optimization build task
gulp.task('default', function () {
  sequence('clean', ['movecss','movejs']);
});

// build project
gulp.task('dist', function () {
  target = 'dist/';
  sequence('clean', ['movecss'], ['minify:css', 'uglify:js']);
});
