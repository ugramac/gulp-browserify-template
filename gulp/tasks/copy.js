var gulp = require('gulp');
var merge = require('merge-stream');

gulp.task('copy', function() {
	var html = gulp
    .src('index.html')
		.pipe(gulp.dest('build/app-web'));

  var images = gulp
   .src('src/images/**/*')
   .pipe(gulp.dest('build/app-web/images'));

  var styles = gulp
   .src([/*'src/styles/ionic.css',*/ 'node_modules/leaflet/dist/leaflet.css'])
   .pipe(gulp.dest('build/app-web'));

  var fonts = gulp
   .src('src/styles/fonts/**/*')
   .pipe(gulp.dest('build/app-web/fonts'));

  var appLoader = gulp
   .src('src/scripts/app-loader.js')
   .pipe(gulp.dest('build/app-web'));

  var phonegapConfig = gulp
   .src('phonegap/config.xml')
   .pipe(gulp.dest('build/phonegap/'));


  return merge(html, styles, images, fonts, appLoader, phonegapConfig);
});
