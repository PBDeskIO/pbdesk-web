;(function () {
    'use strict';

    var gUtil = require('./../gulp.utils.js');

    /*
     gulp: gulp, // gulp object require('gulp');
     GP: GP, // GulpPlugins - require('gulp-load-plugins')({lazy:true});
     config: gulpConfig,
     args: args
     */

    gUtil.gulp.task('copyBower', ['cleanPublicBower', 'copyJQuery', 'copyBootstrap',
        'copyFontawesomeCSS', 'copyFontawesomeFONTS', 'copyToastr', 'copyAngularCore']);

    gUtil.gulp.task('cleanPublicBower', function(){
        return gUtil.clean(gUtil.config.publicVendorFolder);
    });

    gUtil.gulp.task('copyJQuery', function(){
        gUtil.log('Copy jquery from bower_components to public/bower');
        return gUtil.copyFiles(gUtil.config.bower.jquery.source, gUtil.config.bower.jquery.dest);
    });

    gUtil.gulp.task('copyBootstrap', function(){
        gUtil.log('Copy bootstrap from bower_components to public/bower');
        return gUtil.copyFiles(gUtil.config.bower.bootstrap.source, gUtil.config.bower.bootstrap.dest);
    });

    gUtil.gulp.task('copyFontawesomeCSS', function(){
        gUtil.log('Copy fontawesome from bower_components to public/bower');
        return gUtil.copyFiles(
            gUtil.config.bower.fontawesomeCSS.source,
            gUtil.config.bower.fontawesomeCSS.dest
        );
    });
    gUtil.gulp.task('copyFontawesomeFONTS', function(){
        gUtil.log('Copy fontawesome from bower_components to public/bower');
        return gUtil.copyFiles(
            gUtil.config.bower.fontawesomeFONTS.source,
            gUtil.config.bower.fontawesomeFONTS.dest
        );
    });

    gUtil.gulp.task('copyToastr', function(){
        gUtil.log('Copy toastr from bower_components to public/bower');
        return gUtil.copyFiles(gUtil.config.bower.toastr.source, gUtil.config.bower.toastr.dest);
    });

    gUtil.gulp.task('copyAngularCore', function(){
        gUtil.log('Copy angular from bower_components to public/bower');
        return gUtil.copyFiles(gUtil.config.bower.angularCore.source, gUtil.config.bower.angularCore.dest);
    });

}());

