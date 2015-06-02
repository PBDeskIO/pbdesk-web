;(function(){
    'use strict';

    var gulp = require('gulp');
    var GP = require('gulp-load-plugins')({lazy:true});
    var args = require('yargs').argv;
    var del = require('del');
    var configs = require('./gulp.config');


    module.exports =  {
        gulp: gulp,
        GP: GP,
        Configs: configs,
        del: del,
        clean: _clean

    };

    function _clean(dest){
        _log('Cleaning: ' + GP.util.colors.blue(dest));
        del(dest, function(err, deletedFiles){
            if(err){
                _log('Error cleaning : in _clean call');
                _log(err);
            }
            else {
                _logV(deletedFiles.length +  ' Files deleted:');
                _logV(deletedFiles.join(', '));
            }
        });
    }

    function _log(msg){
        if(typeof(msg) === 'object'){
            for(var item in msg){
                if(msg.hasOwnProperty(item)) {
                    GP.util.log(GP.util.colors.blue(msg[item]));
                }
            }
        }
        else {
            GP.util.log(GP.util.colors.yellow(msg));
        }
    }

    function _logV(msg){
        if(args.verbose) {
            _log(msg);
        }
    }

}());

/*
;(function(){
    'use strict';

    module.exports = function(){

        var gulp = require('gulp');
        var args = require('yargs').argv;
        var del = require('del');
        var GP = require('gulp-load-plugins')({lazy:true});

        var gulpConfig = require('./gulp.config');

        var gUtil = {
            gulp: gulp,
            GP: GP,
            config: gulpConfig,
            args: args,
            log: _log,
            logV: _logV,
            copyFiles: _copyFiles,
            clean: _clean
        };
        return gUtil;

        function _log(msg){
            if(typeof(msg) === 'object'){
                for(var item in msg){
                    if(msg.hasOwnProperty(item)) {
                        GP.util.log(GP.util.colors.blue(msg[item]));
                    }
                }
            }
            else {
                GP.util.log(GP.util.colors.yellow(msg));
            }
        }

        function _logV(msg){
            if(args.verbose) {
                _log(msg);
            }
        }

        function _copyFiles(source, dest){
            _logV('Copying ' + source  + ' to ' + dest);
            return gulp
                .src(source)
                .pipe(gulp.dest(dest));
        }

        function _clean(dest){
            del(dest, function(err, deletedFiles){
                if(err){
                    _log('Error cleaning : in _clean call');
                    _log(err);
                }
                else {
                    _logV(deletedFiles.length +  ' Files deleted:');
                    _logV(deletedFiles.join(', '));
                }
            });
        }

    };

}());
*/
