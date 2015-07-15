	var gulp = require("gulp");
	var plumber = require('gulp-plumber'); //Gulp error handler
	var inject = require('gulp-inject'); //Injects content to a page like server side includes do
	var sass = require('gulp-sass');//SCSS/SASS
	var csso = require('gulp-csso'); //shorthands CSS which uglify doesn't do
	var hb = require('gulp-hb');//Handlebars
	var cheerio = require('gulp-cheerio'); //Run jQuery in Gulp
	var data = require('gulp-data');//Required for HB
	var gutil = require('gulp-util');//Gulp utility file
	var clean = require('gulp-clean');//deletes files
	var rename = require("gulp-rename");//renames files

//blank defaut task. by typing Gulp at the cmd line, it will confirm if it works. If not, you'll see errors that will point you to what's missing/wrong
gulp.task("default", function () {
	gutil.log(gutil.colors.bgGreen.white('GULP WORKS'), gutil.colors.bgRed.white.bold("DON'T BREAK IT"))
});	



gulp.task('build', function () {
    return gulp.src('./src/template/template.html')//get template
        .pipe(plumber())//start error handler
        .pipe(inject(gulp.src(['./src/handlebars/module1.html']), {starttag: '<!-- inject:module1:{{ext}} -->',transform: function (filePath, file) { return file.contents.toString('utf8')} }))//maps modules to injection points
        .pipe(inject(gulp.src(['./src/handlebars/module2.html']), {starttag: '<!-- inject:module2:{{ext}} -->',transform: function (filePath, file) { return file.contents.toString('utf8')} }))
        .pipe(data(function (file) { return require('./src/json/template.json') }))//grabs json
        .pipe(hb())//handlebars
        .pipe(gulp.dest('dist/'));//output
});