;(function () {
    'use strict';

    var GU = require('./../gulp.utils.js');
    var vinylPaths = require('vinyl-paths');
    var runSequence = require('run-sequence');



    GU.gulp.task('optimize-js', function(){
        return GU.gulp
            .src(GU.Configs.jsFiles)
            .pipe(GU.GP.print())
            .pipe(GU.GP.uglify())
            .pipe(GU.gulp.dest(GU.Configs.jsBuildFolder));
    })


    GU.gulp.task('bundle-js', function(){
        return GU.gulp
            .src(GU.Configs.jsMinFiles)
            .pipe(GU.GP.print())
            .pipe(GU.GP.concat('bundle.js'))
            .pipe(GU.gulp.dest(GU.Configs.jsBundleDest));
    })

    GU.gulp.task('BUILD-JS', function(callback){
        runSequence(
            'clean:js',
            'optimize-js',
            'bundle-js',
            callback
        );

    })

    GU.gulp.task('clean:js', function(done){
        return GU.gulp
            .src([GU.Configs.buildFolder + 'js',GU.Configs.cssBundleDest + 'bundle.js' ])
            .pipe(vinylPaths(GU.del));
    })


})();

