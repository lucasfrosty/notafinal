const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');

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
  .pipe(gulp.dest('css/min'));
});

// Watch for saves
gulp.task('watch', () => {
  gulp.watch('js/*.js', ['uglifyjs']);
  gulp.watch('css/*.css', ['uglifycss']);
});
