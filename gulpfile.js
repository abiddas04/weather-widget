var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    typescript = require('gulp-typescript'),
    small = require('small').gulp,
    sourcemaps = require('gulp-sourcemaps');

var tsProject = typescript.createProject('lib/tsconfig.json');

gulp.task('compile', () => {
    return gulp.src('lib/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(small('index.js', {
            externalResolve: ['node_modules'],
            globalModules: {
                "crypto": {
                    standalone: "undefined"
                }
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/scripts'));
});

gulp.task('release', ['compile'], () => {
    return gulp.src('static/scripts/scripts.js')
        .pipe(uglify())
        .pipe(gulp.dest('static/scripts'));
});

gulp.task('default', ['compile']);