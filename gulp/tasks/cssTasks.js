;(function () {
    'use strict';

    var GU = require('./../gulp.utils.js');
    var vinylPaths = require('vinyl-paths');
    var runSequence = require('run-sequence');



    GU.gulp.task('optimize-css', function(){
        return GU.gulp
            .src(GU.Configs.cssFiles)
            .pipe(GU.GP.print())
            .pipe(GU.GP.autoprefixer({browsers: ['last 5 version', '> 5%']}))
            .pipe(GU.GP.csso())
            .pipe(GU.gulp.dest(GU.Configs.cssBuildFolder));
    })

    GU.gulp.task('optimize-theme-css', function(){
        return GU.gulp
            .src(GU.Configs.cssTheme)
            .pipe(GU.GP.print())
            .pipe(GU.GP.autoprefixer({browsers: ['last 5 version', '> 5%']}))
            .pipe(GU.GP.csso())
            .pipe(GU.GP.rename('theme.css'))
            .pipe(GU.gulp.dest(GU.Configs.cssBuildFolder));
    })

    GU.gulp.task('bundle-css', function(){
        return GU.gulp
            .src(GU.Configs.cssBundle)
            .pipe(GU.GP.print())
            .pipe(GU.GP.concat('bundle.css'))
            .pipe(GU.gulp.dest(GU.Configs.cssBundleDest));
    })

    GU.gulp.task('BUILD-CSS', function(callback){
        runSequence(
            'clean:css',
            ['optimize-css', 'optimize-theme-css'],
            'bundle-css',
            callback
        );

    })

    GU.gulp.task('clean:css', function(done){
        return GU.gulp
            .src([GU.Configs.buildFolder + 'css',GU.Configs.cssBundleDest + 'bundle.css' ])
            .pipe(vinylPaths(GU.del));
    })


})();

