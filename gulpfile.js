var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  coffee = require('gulp-coffee'),
  concat = require('gulp-concat');

// Scripts Task
gulp.task('scripts', function(){
  gulp.src('coffee/*.coffee')
  .pipe(plumber())
  .pipe(coffee())
  .pipe(gulp.dest('js/'));
});

// Concatenate JS scripts
gulp.task('concat', function(){
  gulp.src('js/script.js')
  .pipe(plumber())
  .pipe(concat('all.js'))
  .pipe(gulp.dest(''));
});

// Styles Task
gulp.task('styles', function() {
  return sass('scss/style.scss', { style: 'expanded' })
    .pipe(autoprefixer({
      browsers: ['> 1%']
    }))
    .pipe(gulp.dest('css'));
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('coffee/*.coffee', ['scripts']);
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('js/*.js', ['concat']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'watch']);