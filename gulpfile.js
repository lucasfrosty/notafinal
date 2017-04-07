const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


gulp.task('default', ['uglifycss', 'uglifyjs', 'watch']);

// Uglifies JS
gulp.task('uglifyjs', () => {
  gulp.src('js/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('js/min'));
});

// Uglifies CSS
gulp.task('uglifycss', () => {
  gulp.src('css/*.css')
  .pipe(uglifycss())
  .pipe(rename({ suffix: '.min' }))
  .pipe(postcss([ autoprefixer() ]))﻿ // if using sass use this command there instead.
  .pipe(gulp.dest('css/min'))
  .pipe(livereload()); // if using sass use this command there instead.
});

// Watch for saves
gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('js/*.js', ['uglifyjs']);
  gulp.watch('css/*.css', ['uglifycss']);
  // gulp.watch('sass/**/*.scss', ['sass-compiler']);
});

// Minify images
gulp.task('images', () => {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('images/'))
});


//// Compile Sass
// gulp.task('sass-compiler', () => {
//   gulp.src('sass/**/*.scss')
//   .pipe(sass().on('error', sass.logError))
//   .pipe(postcss([ autoprefixer() ]))﻿
//   .pipe(gulp.dest('./css'))
//   .pipe(livereload());
// });
