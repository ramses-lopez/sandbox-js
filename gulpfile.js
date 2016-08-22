var gulp = require('gulp');
var nodemon = require('nodemon');
var nodeInspector = require('gulp-node-inspector');

gulp.task('debug', () => {
	gulp.src([])
	.pipe(nodeInspector({
		webHost: 'localhost',
		webPort: 3003,
		saveLiveEdit: false
	}))
})

gulp.task('nodemon', () => {
	nodemon({
		exec: 'node --debug',
		script: 'app.js',
		ext: 'js csv'
	})
	.on('start', () => console.info('starting...'))
	.on('restart', () => console.info('\n\n\n\n\n---------------------- restarting ----------------------'))
	.on('quit', () => {})
})

gulp.task('server', () => {
	nodemon({
		exec: 'node --debug',
		script: 'server.js',
		ext: 'js html'
	})
	.on('start', () => console.info('starting...'))
	.on('restart', () => console.info('\n\n\n\n\n---------------------- restarting ----------------------'))
	.on('quit', () => {})
})

gulp.task( 'default', ['nodemon','debug'], () => {})
