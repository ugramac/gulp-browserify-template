var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('./src/styles/**/*.scss', ['sass']);
	//gulp.watch('./src/images/**', ['images']);
	gulp.watch(['index.html', 'phonegap/config.xml', 'src/images/**/*'], ['copy']);
	// Note: The browserify task handles js recompiling with watchify
});
