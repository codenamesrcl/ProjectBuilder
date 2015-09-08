//gulp guide
//http://blog.nodejitsu.com/npmawesome-9-gulp-plugins/

/**
 * Right now the builders are constructed around a rather pessimistic build principle
 * That is, they execute a full build whenever something changes
 * With the builders already setup to be multiple configs in each, it's definitely possible
 * to set up each along their own module pipeline instead of doing a build-all style build
 * at any change, this would make things more efficient and maintainable in the future build processes
 * Will do this sometime in the near future but for now the pessimistic process stays
 */


var projects = [
    "projectBuilder",
];


var _ = require("lodash");

var _cwd = process.cwd();

var gulp = require('gulp');  
var batch = require('gulp-batch');
var exec = require('child_process').exec;

var moment = require('moment');
var taskRunner = require(_cwd + "/lib/gulpTaskRunner");

//create tasks based around the project builders specified
projects.forEach(function(projectname){
    gulp.task(projectname + '-build-dev', function(){
        taskRunner.groupBuildDev(projectname);
    });

    gulp.task(projectname + '-build-prod', function(){
        taskRunner.groupBuildProd(projectname);
    });

    gulp.task(projectname + '-group-setup', function(){
        var builder = require(_cwd + '/builders/' + projectname);
        var path = __normalizePath(builder.projectPath);

        var watchset = [
            //any js file that is not in the _builds folder or any _ prefix folder period
            //as those are "system" or ignorable folders
            path + "app/[^_]*/**/*.js",  //app/[^_]*/**/*.js
            path + "app/[^_]*/**/*.html",
        ];

        console.log(watchset);

        gulp.watch(watchset, batch({timeout: 1000}, function(events, done) {
            var dtString = moment().format("hh:mm:ss a")
            console.log(dtString + ": angular build initiated");
            taskRunner.groupBuildProd(projectname);
            done();
        }));

    })

    gulp.task(projectname + "-setup", function(){
        var builder = require(_cwd + '/builders/' + projectname);

        _.forOwn(builder.config.angular, function(pConf, key){
            pConf.srcRoot = __normalizePath(pConf.srcRoot);
            var watchset = [
                pConf.srcRoot + "**/*.js",  //app/[^_]*/**/*.js
                pConf.srcRoot + "**/*.html",
            ];

            //we use the 1 second timeout so that there are no chances of repeat runs due to
            //over-eager batch runs, we take a fair amount of time to batch the events before executing
            gulp.watch(watchset, batch({timeout: 1000}, function(events, done) {
                var dtString = moment().format("hh:mm:ss a")
                console.log(dtString + ": angular build initiated");
                taskRunner.soloBuild(pConf, key);
                done();
            }));

            console.log("created angular build watch for " + projectname + " "  + key);
        });
    });

});

gulp.task("nw",function(){
    var nw = exec('start nwjs/nw.exe .');
    nw.stdout.on('data', function(code){
        console.log("data");
    });
});

gulp.task('help', function(){
    var instance = exec('gulp --tasks');
    instance.stdout.on('data', function(data){
        console.log(data);
    });
});

function __normalizePath(value){
    return value + (!_.endsWith(value, '/') ? '/' : "");
}

