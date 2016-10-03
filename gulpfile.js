var gulp = require("gulp"),
	connect = require("gulp-connect"),
	opn = require("opn"),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');

//запуск локального сервера
	gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn('http://localhost:8888');
});
//работа с html
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
//работа с сss
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
  .pipe(connect.reload());
});

//работа с js
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

//работа с sass
gulp.task('sass', function () {
 return gulp.src('./app/css/scss/main.scss')
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(concat('main.css'))
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./app/css'))
  });


gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch('./app/css/*/*.scss', ['sass']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/js/*.js'], ['js']);
});
//задача по умолчанию
gulp.task('default', ['sass', 'connect', 'watch']);