/**
 * Angular Builder
 * A rudamentary project builder for angular js
 *
 * includes
 * - template caching
 * - minification/uglification
 * - sourcemaps for dev builds
 * - 
 */


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

var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate'); 
var concatSourcemap = require('gulp-concat-sourcemap');
var minifyHTML = require('gulp-minify-html');

function angularTemplateCompile_Generalize(config){
    //target is a key string into the central _config object
    //var config = require('./builders/' + target);

    if(!config){
        throw "Invalid target";
    }

    //fix the root endings if needed
    config = __normalizeRootPaths(config);


    //there should be a list of compile paths to work with
    return gulp.src(config.srcRoot + "**/*.html")
        .pipe(plumber())
        .pipe(minifyHTML({
            empty: true, //preserve empty attributes
            comments: false, //remove comments
            spare: true, //preserve perceived redundant attributes
            quotes: true, //preserve perceived redudnant quotes
            loose: true, //preserve one whitespace for text spacing reasons
        }))
        .pipe(templateCache(
                config.appModuleName + "-templates.js", 
                {
                    root: config.cacheRoot,
                    module: config.appModuleName,
                    standalone: false,
                })
        )
        .on('error', gutil.log)
        .pipe(gulp.dest(config.destPath));
} //end of template compile generalize

function angularAppBuild_Generalize(config, mode){
    //var config = require('./builders/' + target);

    if(!config){
        throw "Invalid target";
    }

    //fix the root endings if needed
    config = __normalizeRootPaths(config);

    if(mode == 'dev'){
        return gulp.src(config.srcRoot + '**/*.js')//config.destPath + config.appModuleName + '.js')
            .pipe(plumber())            
            //normal concat causes a problem with sourcemaps, so this plugin
            //does both in a properly handled fashion
            .pipe(concatSourcemap(config.appModuleName + '.min.js', {
                sourcesContent: true, 
            }))
            .pipe(gulp.dest(config.destPath))
            .on('error', gutil.log);
    }
    else if(mode == 'prod'){
        return gulp.src(config.srcRoot + '**/*.js')//config.destPath + config.appModuleName + '.js')
            .pipe(plumber())
            //ngAnnotate helps to format dependency injection for angular so that it can be
            //uglified correctly
            .pipe(ngAnnotate())
            .pipe(concat(config.appModuleName + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(config.destPath))
    }

} //end of app build generalize

/**
 * [Compile the entire project group]
 * @param  {[type]} builders [the set of config options for each module within the group]
 * @param  {[type]} mode     [dev or prod mode]
 */
function _angularGroupCompile(builders, mode){
    var dtString = moment().format("hh:mm:ss a")
    //var config = require('./builders/' + buildername);
    _.forOwn(builders, function(pConf, keyname){
         var builder = builders[keyname];
        console.log(dtString + ': angular project compile ' + keyname);
        angularTemplateCompile_Generalize(builder);
        angularAppBuild_Generalize(builder, mode);
    });

} //end of group compile

function _angularSoloCompile(builder, name, mode){
    var dtString = moment().format("hh:mm:ss a")
    console.log(dtString + ': angular module compile ' + name);
    angularTemplateCompile_Generalize(builder);
    angularAppBuild_Generalize(builder, mode);
}

function __normalizePath(value){
    if(!_.endsWith(value, '/')){
        value += '/';
    }

    return value;
}
function __normalizeRootPaths(config){
    config.srcRoot = __normalizePath(config.srcRoot);
    config.cacheRoot = __normalizePath(config.cacheRoot);
    config.destPath = __normalizePath(config.destPath);

    return config;
}






module.exports = {
    groupCompile: _angularGroupCompile,
    soloCompile: _angularSoloCompile,
}




// var watchset = [
//     //any js file that is not in the _builds folder or any _ prefix folder period
//     //as those are "system" or ignorable folders
//     //pConf.srcRoot + "[^_]*/**/*.js",  //app/[^_]*/**/*.js
//     //pConf.srcRoot + "[^_]*/**/*.html",
//     pConf.srcRoot + "**/*.js",  //app/[^_]*/**/*.js
//     pConf.srcRoot + "**/*.html",
// ];