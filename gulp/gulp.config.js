;(function(){
    'use strict';

    var appFolder = './src/';
    var buildFolder = './serve/';
    var releaseFolder = "./site/";
    var currentTheme = 'red'; // red blue green


    module.exports =  {
        serverJS:[
            './server/**/*.js'
        ],

        appFolder: appFolder,
        buildFolder: buildFolder,
        releaseFolder: releaseFolder,
        htmlFiles: [
            appFolder + '_site/**/*.html'
        ],
        imageSrc: './images/**/*.*',
        imageDest: appFolder  +  'img/',
        cssBundle: [
            appFolder  +  'css/flexslider.css',
            appFolder  +  'css/prettyPhoto.css',
            appFolder  +  'css/' + currentTheme + '.css',
            appFolder  +  'css/style.css',
            appFolder  +  'css/custom.css'
        ],
        cssBundleDest: appFolder + 'css/',

        jsBundle:[
            appFolder + 'js/easing.js',
            appFolder + 'js/flexslider.js',
            appFolder + 'js/jquery.prettyPhoto.js',
            appFolder + 'js/isotope.js',
            appFolder + 'js/custom.js',
        ],
        jsBundleDest: appFolder + 'js/',
    };

}());