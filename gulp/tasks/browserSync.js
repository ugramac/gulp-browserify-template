var browserSync         = require('browser-sync');
var gulp                = require('gulp');
var url = require('url');
var path = require('path');

gulp.task('browserSync', ['build'], function() {
	browserSync.init(['build/app-web/**/*.js', 'index.html'], {
		server: {
			baseDir: ['build/app-web'],
      routes: {
        // '/node_modules': '../node_modules'
      },
      middleware: function pushState(req, res, next) {
        var pathname = url.parse(req.url).pathname;
        var hasFileExtension = !!(path.extname(pathname));

        if (hasFileExtension) {
          next();
        } else {
          req.url = '/';
          next();
        }
      }
		},

    open: false
	});
});
