var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concatCss = require('gulp-concat-css');
var uglifycss = require('gulp-uglifycss');
var stripCssComments = require('gulp-strip-css-comments');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

var cssFiles = [
	'bower_components/bootstrap/dist/css/bootstrap.css'
	'dist/css/global.css'
];

var jsFiles = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/parallax/parallax.js',
    'dist/js/global.js'
]

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./dist/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function() {
   gulp.src(jsFiles)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
	return sass('sass/global.scss')
		.on('error', sass.logError)
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', function() {
    gulp.watch(['./dist/js/global.js'], ['js']);
    gulp.watch(['./dist/*.html'], ['html']);
	gulp.watch(['sass/*.scss'], ['sass']);
	gulp.watch(['./dist/css/*'], ['concatCss']);
});

gulp.task('concatCss', function() {
	return gulp.src(cssFiles)
		.pipe(concatCss('site.css'))
		.pipe(stripCssComments( { preserve: false } ))
		.pipe(uglifycss())
		.pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('default', ['sass', 'js', 'concatCss', 'watch', 'connect']);
