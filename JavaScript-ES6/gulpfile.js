const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        rename = require('gulp-rename'),
        browserify = require('gulp-browserify');

const   config = require('./config');

gulp.task('sass', function () {

    gulp.src(config.paths.scss.in)
        .pipe(sass({outputStyle: 'nested'}))
        .on('error', function (err) {
            console.log('gulp SASS error', err.toString());

            // this.emit('end');
        })
        .pipe(rename(function (path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest(config.paths.scss.out))
        .on('end', function(){
            console.log('gulp SASS ended successfully');
        })
});

gulp.task('browserify', function () {

    gulp.src(config.paths.js.entryFile)
        .pipe(browserify(
            // {'transform': ['babelify']}
            ).on('error', function(err){
                console.log('gulp BROWSERIFY error', err.toString());
            })) 
        .pipe(rename(function (path) {
            // path.basename = path.basename.slice(0, path.basename.lastIndexOf('.')) + '.min'
            path.basename = path.basename + '.min';
        }))
        .pipe(gulp.dest(config.paths.js.out))
        .on('end', function(){
            console.log('gulp BROWSERIFY ended successfully');
        })
});

gulp.task('watch', function () {
    gulp.watch(config.paths.scss.in, ['sass'])
    gulp.watch(config.paths.js.in, ['browserify'])
});

gulp.task('default', ['watch']);
