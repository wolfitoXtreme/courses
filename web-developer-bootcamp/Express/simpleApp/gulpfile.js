// dependencies
var gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc3');

var project = require('./package.json'),
    projectName = project.name;

// 
// tasks
// 


// write documentation
gulp.task('doc', function() {

    return gulp.src(['README.md', 'app.js'], {read: false})
        .pipe(jsdoc({
            // configuration example => https://github.com/AndrewGuenther/gulp-jsdoc3/blob/master/src/jsdocConfig.json
            'opts': {
                'destination': './docs/'
            },
            'plugins': [], // no plugins
            'templates': {
                'systemName': projectName + ' - documentation',
                'navType': 'inline',
                'theme': 'flatly' // cerulean, Cosmo, Cyborg, Flatly, Journal, Lumen, Paper, Readable, Sandstone, Simplex, Slate, Spacelab, Superhero, United, Yeti
            }
        }));
});


// default task
gulp.task('default', ['doc']);


// // dependencies
// var gulp = require('gulp'),
//     jsdoc = require('gulp-jsdoc3');

// // 
// // tasks
// // 

// // write documentation
// function docs() {

//     return gulp.src(['README.md', 'app.js'], {read: false})
//         .pipe(jsdoc({
//             'opts': {
//                 'destination': './docs/'
//             }
//         }, callback));
// }


// // exports module notation to declare tasks
// exports.docs = docs;

// // Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
// // ex: var build = gulp.series(task1, gulp.parallel(task2, task3));
// // var build = gulp.series(docs);

// // default task
// gulp.task('default', build);
