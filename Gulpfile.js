/*********************
**** In te vullen ****
*********************/
var projectName = 'installatiemetgulptemplate';

var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var sourcemaps   = require('gulp-sourcemaps');
var plumber      = require('gulp-plumber');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');

// Static Server
gulp.task('server', ['styles'], function() {

	browserSync.init({
		proxy: 'localhost/' + projectName
	});

	gulp.watch('src/sass/**/*.scss', ['styles']).on('change', browserSync.reload);
	gulp.watch('src/js/**/*.js', ['js']).on('change', browserSync.reload);
	gulp.watch('*.php').on('change', browserSync.reload);
});

// Styles
gulp.task('styles', function() {

	var onError = function(err) {
		notify.onError({
					title:    "Gulp",
					subtitle: "Failure!",
					message:  "Error: <%= error.message %>",
					sound:    "Beep"
				})(err);

		this.emit('end');
	};

	return gulp.src('src/sass/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())

		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(autoprefixer())
		.pipe(minifyCSS())

		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream());
});

// JS
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())

		.pipe(uglify())
		.pipe(concat('main.js'))

		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('assets/js'))
		.pipe(browserSync.stream());
});

// Default
gulp.task('default', ['server']);