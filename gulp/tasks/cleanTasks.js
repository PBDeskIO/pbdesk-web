;(function () {
    'use strict';

    var gUtil = require('./../gulp.utils.js');

    gUtil.gulp.task('clean-build', function() {
        gUtil.clean(gUtil.config.buildLoc);
    });

    gUtil.gulp.task('clean-temp', function() {
        gUtil.clean(gUtil.config.tempLoc);
    });

    gUtil.gulp.task('clean-vendor', function() {
        gUtil.clean(gUtil.config.publicVendorFolder);
    });

}());
