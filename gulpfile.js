"use strict";

var gulp = require("gulp");
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require("gulp-load-plugins")();
// "del" is used to clean out directories and such
var del = require("del");
// BrowserSync isn"t a gulp package, and needs to be loaded manually
var browserSync = require("browser-sync");
// merge is used to merge the output from two different streams into the same stream
var merge = require("merge-stream");
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.reload;
// And define a variable that BrowserSync uses in it"s function
var bs;

var configs = require("./gulp/gulp.config");
var runSequence = require('run-sequence');

// Deletes the directory that is used to serve the site during development
gulp.task("clean:dev", del.bind(null, ["serve"]));
gulp.task("clean:serve", del.bind(null, ["serve"]));

// Deletes the directory that the optimized site is output to
gulp.task("clean:prod", del.bind(null, ["site"]));

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task("jekyll:dev", $.shell.task("jekyll build"));
gulp.task("jekyll-rebuild", ["jekyll:dev"], function () {
  reload;
});

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don"t end up publishing your drafts or future posts
gulp.task("jekyll:prod", $.shell.task("jekyll build --config _config.yml,_config.build.yml"));


/*gulp.task("styles", function () {

    return gulp
        .src(configs.cssBundle)
        .pipe($.print())
        .pipe($.autoprefixer("last 5 version", {browsers: ['last 5 version', '> 5%'], cascade: true }))
        .pipe($.csso())
        .pipe($.concat('bundle.css'))
        .pipe(gulp.dest(configs.cssBundleDest))
        .pipe(gulp.dest("serve/css/"))
        .pipe($.size({title: "styles"}))
        .pipe(reload({stream: true}));
});*/




gulp.task("optimize-css", function () {

    return gulp
        .src(configs.cssBundle)
        .pipe($.print())
        .pipe($.autoprefixer("last 5 version", {browsers: ['last 5 version', '> 5%'], cascade: true }))
        .pipe($.csso())
        .pipe($.concat('bundle.css'))
        .pipe(gulp.dest(configs.cssBundleDest))
        .pipe(gulp.dest(configs.buildFolder + "css/"))
        .pipe($.size({title: "CSS Bundle"}))
        .pipe(reload({stream: true}));
});


gulp.task("optimize-js", function () {

    return gulp
        .src(configs.jsBundle)
        .pipe($.print())
        .pipe($.uglify())
        .pipe($.concat('bundle.js'))
        .pipe(gulp.dest(configs.jsBundleDest))
        .pipe(gulp.dest(configs.buildFolder + "js/"))
        .pipe($.size({title: "JS Bundle"}))
        .pipe(reload({stream: true}));
});



gulp.task("optimize-images", function () {
  return gulp.src(configs.imageSrc)
      .pipe($.imagemin({
          optimizationLevel: 4,
          progressive: true,
          interlaced: true
      }))
      .pipe(gulp.dest(configs.imageDest))
      .pipe($.size({title: "images"}));
});

gulp.task("optimize-html", ["optimize-css", "optimize-js"], function () {


    return gulp.src("serve/**/*.html")
        .pipe($.minifyHtml({empty: true}))
        .pipe(gulp.dest("serve"))
        .pipe($.size({title: "HTML Optimization"}));
        /*.pipe($.if("*.html", $.htmlmin({
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true
        })))*/
        // Send the output to the correct folder

});


/*
// Copy xml and txt files to the "site" directory
gulp.task("copy", function () {
  return gulp.src(["serve/!**!/!*.txt", "serve/!**!/!*.xml"])
    .pipe(gulp.dest("site"))
    .pipe($.size({ title: "xml & txt" }))
});
*/

/*// Optimizes all the CSS, HTML and concats the JS etc
gulp.task("html", ["styles"], function () {
  var assets = $.useref.assets({searchPath: "serve"});

  return gulp.src("serve/!**!/!*.html")
    .pipe(assets)
    // Concatenate JavaScript files and preserve important comments
    .pipe($.if("*.js", $.uglify({preserveComments: "some"})))
    // Minify CSS
    .pipe($.if("*.css", $.minifyCss()))
    // Start cache busting the files
    //.pipe($.revAll({ ignore: [".eot", ".svg", ".ttf", ".woff"] }))
    .pipe(assets.restore())
    // Conctenate your files based on what you specified in _layout/header.html
    .pipe($.useref())
    // Replace the asset names with their cache busted names
    .pipe($.revReplace())
    // Minify HTML
    .pipe($.if("*.html", $.htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    // Send the output to the correct folder
    .pipe(gulp.dest("site"))
    .pipe($.size({title: "optimizations"}));
});*/


// Task to upload your site to your personal GH Pages repo
gulp.task("deploy", function () {
  // Deploys your optimized site, you can change the settings in the html task if you want to
  return gulp.src("./serve/**/*")
    .pipe($.ghPages({
      // Currently only personal GitHub Pages are supported so it will upload to the master
      // branch and automatically overwrite anything that is in the directory

      }));
});

gulp.task("Push-To-GhPages", function(callback){
    runSequence(
        "clean:serve",
        ["optimize-css","optimize-js"],
        "jekyll:prod",
        "optimize-html",
         "deploy",
        callback
    );

});

// Run JS Lint against your JS
gulp.task("jslint", function () {
  gulp.src("./serve/assets/javascript/*.js")
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint(".jshintrc"))
    .pipe($.jshint.reporter());
});

// Runs "jekyll doctor" on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task("doctor", $.shell.task("jekyll doctor"));

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task("serve:dev",  function () {
    runSequence(
        ["optimize-css","optimize-js"],
        "jekyll:dev"
    );
  bs = browserSync({
      notify: true,
      // tunnel: "",
      server: {
          baseDir: "serve"
      }
  });
});

// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task("watch", function () {
  gulp.watch(["src/**/*.md", "src/**/*.html", "src/**/*.xml", "src/**/*.txt", "src/**/*.js"], ["jekyll-rebuild"]);
  gulp.watch(["serve/assets/stylesheets/*.css"], reload);
  gulp.watch(["src/assets/scss/**/*.scss"], ["styles"]);
});

// Serve the site after optimizations to see that everything looks fine
gulp.task("serve:prod", function () {
  bs = browserSync({
    notify: false,
    // tunnel: true,
    server: {
      baseDir: "site"
    }
  });
});

// Default task, run when just writing "gulp" in the terminal
gulp.task("default", ["serve:dev", "watch"]);

// Checks your CSS, JS and Jekyll for errors
gulp.task("check", ["jslint", "doctor"], function () {
  // Better hope nothing is wrong.
});

// Builds the site but doesn"t serve it to you
gulp.task("build", ["jekyll:prod", "styles"], function () {});

// Builds your site with the "build" command and then runs all the optimizations on
// it and outputs it to "./site"
gulp.task("publish", ["build"], function () {
  gulp.start("html", "copy", "images");
});
