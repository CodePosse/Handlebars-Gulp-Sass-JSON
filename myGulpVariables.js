//REQUIRED FOR TASKS//
var gulp = require("gulp");//core, always first
var argv = require('yargs').argv;//pass arguments to gulpfile
var buffer = require('vinyl-buffer');//filesystem buffer
var changed = require('gulp-changed');//checks for changed files
var cheerio = require('gulp-cheerio');//run jQuery in Gulp
var clean = require('gulp-clean');//deletes files
var concat = require("gulp-concat"); //combines files
var csso = require('gulp-csso'); //shorthands CSS which uglify doesn't do
var data = require('gulp-data');//file object for handlebars
var del = require('del');//deletes files
var filter = require('gulp-filter');//filter groups of files
var fixmyjs = require("gulp-fixmyjs");//fix JS
var fs = require('fs');//filesystem
var git = require('gulp-git');//github integration
var glob = require("glob"); //core
var gulpif = require('gulp-if'); //if statements
var gutil = require('gulp-util');//utilities
var hb = require('gulp-hb');//handlebars
var htmlmin = require('gulp-htmlmin');//minifies and cleans html
var hub = require('gulp-hub');//allows gulp to run other gulp files
var inject = require('gulp-inject'); //Injects content to a page
var insert = require('gulp-insert'); //append or prepend text to a file
var newer = require('gulp-newer');//looks for newer files
var open = require('gulp-open');//opens in browser
var os = require('os');//captures the OS
var path = require('path');//filesystem
var plumber = require('gulp-plumber'); //Gulp error handler
var Promise = require('bluebird');//promises
var Q = require('q');
var recursiveFolder = require('gulp-recursive-folder');//filesystem
var rename = require("gulp-rename");//rename files
var replace = require('gulp-replace');//replace one reference for another
var sass = require('gulp-sass'); //SASS/SCSS tasks
var source = require('vinyl-source-stream');//filestsyem stream
var tap = require('gulp-tap');//tap into file stream
var uglify = require('gulp-uglifyjs'); //Minification of JS by stripping whitespace
var useref = require('gulp-useref'); //use reference
var watch = require('gulp-watch');//watcher task

module.exports = gulp;//allows use of the gulp devtool in chrome
var myVar = 'index';
gulp.task("bump", function () {
    gutil.log(gutil.colors.bgGreen.white.bold(myVar));
});