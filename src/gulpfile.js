var _ = require("lodash");

var _cwd = process.cwd();

var gulp = require('gulp');  
var batch = require('gulp-batch');
var exec = require('child_process').exec;

var moment = require('moment');
var taskRunner = require(_cwd + "/lib/gulpTaskRunner");
var builderScanner = require(_cwd + '/lib/utility/builderScanner');


var projectBuilders = builderScanner.getDirectoryContentsSync(_cwd + '/builders').files;

function generateProjectTasks(){
    //create tasks based around the project builders specified
    projectBuilders.forEach(function(project){
        var projectname = project.name;

        gulp.task(projectname + '-build-dev', function(){
            taskRunner.groupBuildDev(projectname);
        });

        gulp.task(projectname + '-build-prod', function(){
            taskRunner.groupBuildProd(projectname);
        });

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

    }); //end of projectBuilders for each
}

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



generateProjectTasks();