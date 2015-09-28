var _ = require("lodash");
var moment = require('moment');

var _cwd = process.cwd();
var gulp = require('gulp');  
var gutil = require('gulp-util');  
var del = require('del');  
var plumber = require('gulp-plumber');
var batch = require('gulp-batch');

var concat = require('gulp-concat');  
var uglify = require('gulp-uglify');  

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatSourcemap = require('gulp-concat-sourcemap');


//compile the sass, build an external sourcemap for each as well
//pipe the buidls to both a separate _build folder as well as into the stylesheets folder
function compile_sass(config){
	return gulp.src(['Content/sass/*.scss', 'Content/sass/partials/940.scss'], { base: "Content/sass" })
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', gutil.log)
		.pipe(sourcemaps.write("../stylesheets"))
		.pipe(gulp.dest(config.destPath))
		// .pipe(gulp.dest('Content/_build'))
  		//.pipe(gulp.dest('Content/stylesheets'));
}

function _sassSoloCompile(builder, name, mode){
    var dtString = moment().format("hh:mm:ss a")
    console.log(dtString + ': sass module compile ' + name);
    compile_sass(builder);
}

module.exports = {
	compile: _sassSoloCompile
}