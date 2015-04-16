var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var externalLibs = require('../../package.json').externalLibs || [];

gulp.task('browserify', function() {

	var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: true,
		entries: ['./src/scripts/app.js'],
		extensions: ['.js'],
		debug: !gulp.env.production, // enable source maps
    //global: true, // global transforms
    paths: ['./src/scripts'],
    fast: true,
    detectGlobals: false
	});

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .external(externalLibs)
      .require('./src/scripts/app.js', { expose: 'app-main'})
      .bundle()
      .on('error', handleErrors)
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build/app-web'))
			.on('end', bundleLogger.end);
	};

	if(global.isWatching) {
    bundler = watchify(bundler);
		// Rebundle with watchify on changes.
		bundler.on('update', bundle);
	}

	return bundle();
});
