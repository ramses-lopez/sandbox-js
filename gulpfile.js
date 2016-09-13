var gulp = require('gulp');
var env = require('gulp-env');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sassBS', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('nodemonBS', function(cb) {
	// Flag to start nodemon just once
	var called = false;
	nodemon({
		script: 'server.js',
		ext: 'js html'
	})
	.on('restart', function () {
		console.info('Restarting...');
		browserSync.reload({
			stream: false
		});
	})
	.on('start', () => {
		if (!called) {
			cb();
		}
		called = true;
		console.info('Loading');
	}).on('quit', () => {
	});
});

gulp.task('serve', ['sassBS', 'nodemonBS'], function() {
	browserSync.init({
		proxy: "localhost:3001", // local node app address
		port: 5002, // use *different* port than above
		notify: true,
		reloadDelay: 1500,
		ui: {
			port: 3022
		}
	});
	
	gulp.watch("./sass/**/*.scss", ['sassBS']);
	gulp.watch("./html/**/*.html").on('change', browserSync.reload);
});
