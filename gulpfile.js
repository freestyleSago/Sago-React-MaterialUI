var gulp = require('gulp');
var ts = require("gulp-typescript");
var merge = require('lodash/merge');
var sass = require("gulp-sass");
var tsProject = ts.createProject("tsconfig.json");

gulp.task('tsx', (done) => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
    done();
})

gulp.task('dts', (done) => {
    return tsProject.src()
        .pipe(tsProject())
        .dts.pipe(gulp.dest("dist"));
    done();
})

gulp.task('css', (done) => {
    return gulp.src("src/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist"));
    done();
})

gulp.task('img', (done) => {
    return gulp.src('src/**/*.{jpg,jpeg,png}')
        .pipe(gulp.dest('dist'));
    done();
})

gulp.task('default', gulp.series('tsx', 'dts', 'css', 'img'), (done) => done())