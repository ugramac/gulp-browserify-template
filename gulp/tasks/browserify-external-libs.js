var browserify   = require('browserify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');

var externalLibs = require('../../package.json').externalLibs || [];

gulp.task('browserify-external-libs', function() {

  var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: true,
    debug: false
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .require(externalLibs)
      .bundle()
      .on('error', handleErrors)
      .pipe(source('external-libs-bundle.js'))
      .pipe(gulp.dest('./build/app-web'))
      .on('end', bundleLogger.end);
  };

  return bundle();
});
