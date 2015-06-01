
;(function () {
    'use strict';

    var gUtil = require('./../gulp.utils.js');

    gUtil.gulp.task('codeReview', function() {
        gUtil.log('Analyzing source .JS files with JSCS & JSHint');
        return gUtil.gulp
            .src(gUtil.config.alljs)
            .pipe(gUtil.GP.if(gUtil.args.verbose, gUtil.GP.print()))
            .pipe(gUtil.GP.jscs())
            .pipe(gUtil.GP.jshint())
            .pipe(gUtil.GP.jshint.reporter('jshint-stylish', {verbose:true}))
            .pipe(gUtil.GP.jshint.reporter('fail'));
    });

}());
