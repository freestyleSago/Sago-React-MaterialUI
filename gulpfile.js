var gulp = require('gulp');
var ts = require("gulp-typescript");
var sass = require("gulp-sass");
var tsProject = ts.createProject("tsconfig.json");

gulp.task('tsx', (done) => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
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

gulp.task('default', gulp.parallel('tsx', 'css', 'img'), (done) => done())