var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('release', ['compile'], () => {
    return gulp.src('static/scripts/scripts.js')
        .pipe(uglify())
        .pipe(gulp.dest('static/scripts'));
});