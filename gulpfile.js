//   ____   ___    _   _  ___ _____   _____ ____ ___ _____ 
//  |  _ \ / _ \  | \ | |/ _ \_   _| | ____|  _ \_ _|_   _|
//  | | | | | | | |  \| | | | || |   |  _| | | | | |  | |  
//  | |_| | |_| | | |\  | |_| || |   | |___| |_| | |  | |  
//  |____/ \___/ _|_|_\_|\___/_|_| __|_____|____/___| |_|  
//  |_   _| | | |_ _/ ___|  |  ___|_ _| |   | ____|        
//    | | | |_| || |\___ \  | |_   | || |   |  _|          
//    | | |  _  || | ___) | |  _|  | || |___| |___         
//    |_| |_| |_|___|____/  |_|   |___|_____|_____|        
//*******************************************************//                                                    
//All custom edits you will need to make are in the external Gulp file "myGulpVariables.js"
//That file will need you to list it in the .gitignore file.

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
var jshint = require('gulp-jshint'); //js 
var newer = require('gulp-newer');//looks for newer files
var open = require('gulp-open');//opens in browser
var os = require('os');//captures the OS
var path = require('path');//filesystem
var plumber = require('gulp-plumber'); //Gulp error handler
var prettify = require('gulp-prettify');//properly formats HTML
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
var stylish = require('jshint-stylish');
module.exports = gulp;//allows use of the gulp devtool in chrome

//    __  _______ __________     ____  _________________   ____________ 
//   / / / / ___// ____/ __ \   / __ \/ ____/ ____/  _/ | / / ____/ __ \
//  / / / /\__ \/ __/ / /_/ /  / / / / __/ / /_   / //  |/ / __/ / / / /
// / /_/ /___/ / /___/ _, _/  / /_/ / /___/ __/ _/ // /|  / /___/ /_/ / 
// \____//____/_____/_/ |_|  /_____/_____/_/   /___/_/ |_/_____/_____/  
//*******************************************************************//                                                                    
//USER DEFINED VARIABLES//
hub(['./myGulpVariables.js']);


//BEGIN USER DEFINED TASKS//
gulp.task("default", function () {
    gutil.log(gutil.colors.bgGreen.white.bold('GULP WORKS'), gutil.colors.bgRed.white.bold("type: \"gulp --tasks\" to list all tasks"));
    gulp.src(__filename)
  .pipe(open({uri: 'https://www.npmjs.com/package/gulp/'}));
});


//  _       _____  ______________  __   _________   _____ __ _______
// | |     / /   |/_  __/ ____/ / / /  /_  __/   | / ___// //_/ ___/
// | | /| / / /| | / / / /   / /_/ /    / / / /| | \__ \/ ,<  \__ \ 
// | |/ |/ / ___ |/ / / /___/ __  /    / / / ___ |___/ / /| |___/ / 
// |__/|__/_/  |_/_/  \____/_/ /_/    /_/ /_/  |_/____/_/ |_/____/  
//*****************************************************************//
gulp.task('watch:all', function () {
    gulp.watch('./Web/src/scss/**/*.*', ['build:css']);
    gulp.watch('./Web/src/js/*.js', ['build:js']);
    //gulp.watch('./Web/src/hbs/**/*.html', ['build:fragments']);
});                                                                 


//   _____________
//  / ___/ __/ __/
// / /___\ \_\ \  
// \___/___/___/  
//***************//
//BUILD LegalZoom theme CSS
gulp.task('build:css', function () {
    gulp.src('./Web/src/scss/bootstrap.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename("theme.css"))
        .pipe(csso())
        .pipe(gulp.dest('./Web/wwwroot/styleguide/'));
        gutil.log(gutil.colors.bgGreen.white.bold('CSS updated'));
});
//AUTO builds CSS on any source update
gulp.task('watch:css', function () {
	return watch('./Web/src/scss/**/*.*', function () {
    gulp.src('./src/scss/style.scss')
        .pipe(plumber())
        .pipe(concat("theme.css"))
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest('./Web/wwwroot/styleguide/'));
        gutil.log(gutil.colors.bgGreen.white.bold('CSS watch updated'));
    });
});


//      _____ _   _____   ____________  _______  ______
//  __ / / _ | | / / _ | / __/ ___/ _ \/  _/ _ \/_  __/
// / // / __ | |/ / __ |_\ \/ /__/ , _// // ___/ / /   
// \___/_/ |_|___/_/ |_/___/\___/_/|_/___/_/    /_/  
//****************************************************//
//BUILD global JavaScript
gulp.task('build:js', function () {
    gulp.src('./Web/src/js/*.js')
        .pipe(plumber())
        .pipe(concat("global.js"))
        .pipe(insert.prepend('\"use strict\";'))
        .pipe(fixmyjs())
        .pipe(uglify())
        .pipe(insert.append('console.info(\'global.js loaded\');'))
        .pipe(gulp.dest('./Web/wwwroot/resources/js/'));
        gutil.log(gutil.colors.bgGreen.white.bold('global.js updated'));
});
//AUTO builds JS on any source update
gulp.task('watch:js', function () {
    return watch('./Web/src/js/*.js', function () {
    	gulp.src('./Web/src/js/*.js')
        .pipe(plumber())
        .pipe(concat("global.js"))
        .pipe(insert.prepend('\"use strict\";'))
        .pipe(fixmyjs())
        .pipe(uglify())
        .pipe(insert.append('console.info(\'global.js loaded\');'))
        .pipe(gulp.dest('./Web/wwwroot/resources/js/'))
        gutil.log(gutil.colors.bgGreen.white.bold('global.js updated'));
    });
});
//checks JS for errors and issues in SOURCE
gulp.task('lint:js', function() {
  return gulp.src('./Web/src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
//checks JS for errors and issues in compiled folders
gulp.task('lint:js-prod', function() {
  return gulp.src('./Web/wwwroot/resources/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


//     __  __________  _____ 
//    / / / /_  __/  |/  / / 
//   / /_/ / / / / /|_/ / /  
//  / __  / / / / /  / / /___
// /_/ /_/ /_/ /_/  /_/_____/
//**************************//
//BUILD HTML pages
gulp.task('build:page', ['getFragments'], function () {
    var pages = gulp.src(sOrigPath + myPath + myFileName + '.html')  
        .pipe(plumber());
    fragmentsList.forEach(function (fragmentItemEl) {
        pages = pages.pipe(injectItem(fragmentItemEl));
    });
    return pages.pipe(data(function (file) {
        return require(sOrigPath + myPath + myFileName + '.json')
    }))
        .pipe(hb({ helpers: ourHelpers }))
        .pipe(cheerio(function ($, file) {
            $("img:not([alt])").attr("alt", "");//this adds a blank alt tag to images without an alt
        }))
        .pipe(htmlmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest("./Web/wwwroot/" + myPath));
});


//BUILDS ALL HTML PAGES
gulp.task('build:site', ['getFragments'], () => { 
    function walkSync(dir, dirlist) {
        var fs = fs || require('fs'),
            files = fs.readdirSync(dir);
        files.forEach(file => {
            if (fs.statSync(dir + '/' + file).isDirectory()) {
                dirlist.push(dir + '/' + file);
                dirlist = walkSync(dir + '/' + file, dirlist);
            }
        });
        return dirlist;
    };         
    var allDirs = walkSync('./Web/src/pages', []);    
    return buildAllPages(allDirs);
});
var buildAllPages = Promise.coroutine(function *(folders){
    return yield Promise.each(folders,  Promise.coroutine(function*(folder) {
        return yield new Promise( function(resolve, reject) {
            var pages = gulp.src(folder + "/*.html")
                .pipe(plumber());
            fragmentsList.forEach(fragmentItemEl => {
                pages = pages.pipe(injectItem(fragmentItemEl));
        });
        pages.pipe(data(file => {
            var fileName = file.path.replace(/.*\\([A-Za-z0-9_-]+)\.html/i, '$1');
        var filePath = file.path.replace(/.*\\Web\\src\\pages\\(.*)/gmi, '$1').replace(/\\/g, '\/').replace('.html', '.json');
        return require(sOrigPath + filePath); //'./Web/src/pages/'
        }))
        .pipe(hb())
        .pipe(plumber())
        .pipe(cheerio(function ($, file) {
            $("img:not([alt])").attr("alt", "");//this adds a blank alt tag to images without an alt
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./web/" + folder.replace('./Web/src/pages/', '')))
        .on('end', resolve)
        .on('err', reject);
        });            
    }));
});


gulp.task('format:html', function() {
  gulp.src('./Web/wwwroot/styleguide/*.html')
    .pipe(prettify())
    .pipe(gulp.dest('./Web/wwwroot/styleguide/'))
});


//    __________________  ____  ______ 
//   / ____/  _/_  __/ / / / / / / __ )
//  / / __ / /  / / / /_/ / / / / __  |
// / /_/ // /  / / / __  / /_/ / /_/ / 
// \____/___/ /_/ /_/ /_/\____/_____/ 
//**********************************//

gulp.task('git:commit', function(){
  return gulp.src('./**/*')
    .pipe(git.commit(undefined, {
      args: '-m "initial commit"',
      disableMessageRequirement: true
    }));
});
gulp.task('git:add', function(){
  return gulp.src('./**/*')
    .pipe(git.add());
});
gulp.task('git:push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});
gulp.task('git:pull', function(){
  git.pull('origin', 'master', {args: '--rebase'}, function (err) {
    if (err) throw err;
  });
});
