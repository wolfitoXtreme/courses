// versions
    // Sass 3.4.13 (Selective Steve)
    // Compass 1.0.3 (Polaris)

// requirements
    // browser-sync ->  Visual Studio 2013 Update 4 (https://www.visualstudio.com/en-us/news/vs2013-update4-rc-vs.aspx)


// dependencies
var gulp = require('gulp'),
    
    // site
    // compass = require('gulp-compass'),
    // work around since is Ruby has problems authenticating
    compass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),    
    newer = require('gulp-newer'),
    clean = require('gulp-clean'),
    merge = require('merge-stream'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util')
;

// project settigs
var project = require('./package.json'),
    projectName = project.name;

// css support ('gulp-autoprefixer')
var cssSupport = '> 3%';

// DEV or DIST mode
var mode;

// paths
function setPaths(mode){

    // index
    indexFile = 'index.html'

    // dirs
    srcDir = 'dev/';
    destDir = mode === 'DEV' ? srcDir : 'dist/';
    templatesDir = '';
    sassDir = 'sass/';
    fontsDir = 'fonts/'
    cssDir = 'css/';
    imgDir = 'img/';
    jsDir = 'js/';
    assetsDir = 'assets/';

    // paths (dev, dist)
    sassPath = srcDir + sassDir;
    fontsPath = destDir + fontsDir;
    cssPath = destDir + cssDir;
    imgPath = destDir + imgDir;
    jsPath = destDir + jsDir;
    templatesPath = destDir + templatesDir;

    gutil.log(gutil.colors.green(
        '\nPATHS\n' +
        'sassPath = ' + sassPath + '\n' +
        'fontsPath = ' + fontsPath + '\n' +
        'cssPath = ' + cssPath + '\n' +
        'imgPath = ' + imgPath + '\n' +
        'jsPath = ' + jsPath + '\n'
    ));

};


///////////////////////////
//DEVELOPMENT TASKS
///////////////////////////


// compass
gulp.task('compass', function () {

    var taskName = this.seq.slice(0)[0];

    return gulp.src(sassPath + '*.scss')
    
        .pipe(sourcemaps.init())
        .pipe(compass({
            file: sassPath,
            outFile: cssPath
        }).on('error', compass.logError))
        .pipe(sourcemaps.write())

        //autoprefixer
        .pipe(autoprefixer(cssSupport))

        //destination
        .pipe(gulp.dest(cssPath))

        //browserSync
        .pipe(browserSync.reload({
            stream: true
        }))

        // log task
        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    ;

});

// file Changes
gulp.task('fileChange', function () {

    var taskName = this.seq.slice(0)[0];

    return gulp.src([
            templatesPath + '*.html',
            jsPath + '**/*.js',
            cssPath + '*.*'
        ])
    
        //browserSync
        .pipe(browserSync.reload({
            stream: true
        }))

        // log task
        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    ;

});

gulp.task('concat', function() {

    // var taskName = this.seq.slice(0)[0];

    // var defaultAssets = gulp.src([
    //         jsPath + assetsDir + '**/*.js'
    //     ], {base: jsDir})
    //     .pipe(concat('defaultAssets.js', {newLine: ';'}))
    //     .pipe(gulp.dest(jsPath))

    //     // log task
    //     .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    // ;

});

// browserSync
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: ['./' + srcDir, templatesPath],
            index: '/' + templatesDir + indexFile //need to specify this
        }
    });
});

// watch
gulp.task('watch', ['browserSync', 'compass', 'concat'], function (){
    gulp.watch([
        templatesPath + '*.html',
        jsPath + '**/*.js'
    ], ['fileChange', 'concat']);
    gulp.watch(sassPath + '*.scss', ['compass']);
});

// default task
gulp.task('default', function (callback) {
    mode = 'DEV';
    setPaths(mode);

    runSequence(['watch'],
        callback
    );
});


///////////////////////////
// DISTRIBUTION TASKS
///////////////////////////

// copy HTML dist
gulp.task('html_dist', function() {

    var taskName = this.seq.slice(0)[0];

    return gulp.src([
            srcDir + templatesDir + '*.*'
        ], {base: ''})
        
        .pipe(newer(destLocalDir + templatesDir))
        
        // local dist destination
        .pipe(gulp.dest(destLocalDir + templatesDir))

        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    ;

});

// copy DJANGO dist
    // gulp.task('django_dist', function() {
        
    //     mode = 'DIST';
    //     setPaths(mode);

    //     var taskName = this.seq.slice(0)[0];

    //     return gulp.src([
    //             templatesPath + '**/*.html'
    //         ])

    //         .pipe(newer('temp/'))
            
    //         // copy to TEMP dir
    //         .pipe(gulp.dest('temp/'))
            
    //         // upload files
    //         .pipe(gulpif(
    //             upload === false, 
    //             gulp.dest('test_server/' + templatesDir), 
    //             gulpSSH.dest(server_templatesPath)
    //         ))

    //         .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    //     ;

    // });

// copy FONTS dist
gulp.task('fonts_dist', function() {

    var taskName = this.seq.slice(0)[0];

    return gulp.src([
            srcDir + fontsDir + '*.*'
        ], {base: ''})

        .pipe(newer(destDir + fontsDir))
        
        // local dist destination
        .pipe(gulp.dest(destDir + fontsDir))

        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    ;

});

// copy CSS dist
gulp.task('css_dist', ['compass_dist'], function() {

    var taskName = this.seq.slice(0)[0];

    return gulp.src([
            destDir + cssDir + '*.*'
        ], {base: ''})

        .pipe(newer(cssPath))
        
        // autoprefixer
        .pipe(autoprefixer(cssSupport))

        // local dist destination
        .pipe(gulp.dest(destDir + cssDir))

        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    ;

});

// compass dist
gulp.task('compass_dist', function () {

    var taskName = this.seq.slice(0)[0];

    return gulp.src(sassPath + '*.scss')
        
        // changes in destLocalDir
        .pipe(newer(destDir + cssDir))
        
        // compass
        .pipe(
            compass({
                sass: sassPath,
                css: destDir + cssDir,
                image: destDir + imgDir,
                style : 'compressed'
            })
        )

        // log task
        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    ;

});


// js dist (no suffix)
gulp.task('jsmin_dist', function () {

    var taskName = this.seq.slice(0)[0];

    return gulp.src([
            srcDir + jsDir + 'webfont.js',
            srcDir + jsDir + 'defaultAssets.js',
            srcDir + jsDir + projectName + '.js',
            srcDir + jsDir + 'jquery.touchSwipe.min.js',
            srcDir + jsDir + 'owl.carousel.js'
        ])

        // changes in destLocalDir
        .pipe(newer(destDir + jsDir))

        .pipe(uglify({
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            preserveComments : 'license'
        }))

        // local dist destination
        .pipe(gulp.dest(destDir + jsDir))

        // log task
        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })
    ;

});

// jpgCompress dist
gulp.task('jpgCompress_dist', function() {

    return gulp.src(srcDir + imgDir + '*.jpg', {base: ''})

        // changes in destLocalDir
        .pipe(newer(destDir + imgDir))
        
        // jpeg compress
        .pipe(jpegRecompress({
            max: 85,
            min: 50
        })())

        // local dist destination
        .pipe(gulp.dest(destDir+ imgDir))
        
        // log task
        .on('end', function(){ gutil.log(gutil.colors.green('jpgCompress ' + mode + ' task finished!!')); })
    ;

});

// pngCompress dist
gulp.task('pngCompress_dist', function() {

    return gulp.src(srcDir + imgDir + '*.png')

        // changes in destLocalDir
        .pipe(newer(destDir + imgDir))

        // png compress
        .pipe(pngquant({
            quality: '75-95', 
            speed: 5,
            // nofs: true,
            // floyd: 0.3,
            // verbose: true
        })())

        // .pipe(cache(pngquant({
        //     quality: '75-95', 
        //     speed: 5,
        //     // nofs: true,
        //     // floyd: 0.3,
        //     // verbose: true
        // })()))

        // changes in destLocalDir
        .pipe(newer(destDir + imgDir))

        // local dist destination
        .pipe(gulp.dest(destDir + imgDir))

        // log task
        .on('end', function(){ gutil.log(gutil.colors.green('pngCompress ' + mode + ' task finished!!')); })
    ;

});

// svgCompress dist
gulp.task('svgCompress_dist', function() {

    return gulp.src(srcDir + imgDir + '*.svg')

        // changes in destLocalDir
        .pipe(newer(destDir+ imgDir))

        // svg compress
        .pipe(svgo()())

        // .pipe(cache(svgo()()))

        // changes in destLocalDir
        .pipe(newer(destDir + imgDir))

        // local dist destination
        .pipe(gulp.dest(destDir + imgDir))
        
        // log task
        .on('end', function(){ gutil.log(gutil.colors.green('svgCompress ' + mode + ' task finished!!')); })

    ;
});

// clean dist
gulp.task('clean_dist', ['clearCache'], function () {

    mode = 'DIST';
    setPaths(mode);

    var taskName = this.seq.slice(0)[0];

    return gulp.src([
            
            // local dist destination
            destDir

        ], {read: false})
        .pipe(clean())

        // log task
        .on('end', function(){ gutil.log(gutil.colors.green(taskName + ' ' + mode + ' task finished!!')); })

    ;


});

// clear chache
gulp.task('clearCache', function (done) {
    return cache.clearAll(done);
});


// dist
gulp.task('dist', function(callback) {
    mode = 'DIST';
    setPaths(mode);

    runSequence(
        'html_dist',
        'fonts_dist',
        'css_dist',
        'jsmin_dist',
        // 'jpgCompress_dist',
        // 'pngCompress_dist',
        // 'svgCompress_dist',
        callback
    );
});
