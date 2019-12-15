// 
// dependencies
// 

const gulp =  require('gulp'),
      ts =    require('gulp-typescript');

// TypeScript configuration
const tsProject = ts.createProject('tsconfig.json');

// 
// tasks
//

// typeScript
gulp.task('typescript', function(){
    return tsProject.src() // empty as using tsconfig
        // compile using tsconfig
        .pipe(ts(tsProject))
        .pipe(gulp.dest(''));
});

// watch for changes
gulp.task('watch', function(){
    gulp.watch('*.ts', ['typescript']);
});

// default task
gulp.task('default', [
    'watch'
]);
