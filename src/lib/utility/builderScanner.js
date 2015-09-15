module.exports = {
	getDirectoryContents: getDirectoryContents,
	getDirectoryContentsSync: getDirectoryContentsSync
}

var _fs = require("fs");
var _ = require("lodash");
var _path = require("path");
var _q = require('q');

function getDirectoryContents(path){
    if(!path){ path = process.cwd(); }

    var deferred = _q.defer();

    _fs.readdir(path, function(err, files){
        var result = {
            directories: [],
            files: []
        }
        function __appendResult(target, name, type, path){
            var pathSpec = _path.parse(path);
            
            result[target].push({
                name: pathSpec.name,
                fullname: pathSpec.base,
                ext: pathSpec.ext,
                type: type,
                path: path
            });
        }

        var __done = _.after(files.length, function(){
            deferred.resolve(result);
        });

        //files array includes both files and directories
        _.forEach(files, function(item, index, array){
            _fs.lstat(path + '/' + item, function(err, stats){
                if(stats.isFile()){
                    __appendResult("files", item, "f", path + '/' + item);
                }
                else if(stats.isDirectory()){
                    __appendResult("directories", item, "d", path + '/' + item);
                }

                __done();
            });
        });
    })

    return deferred.promise;
}

function getDirectoryContentsSync(path){
	if(!path){ path = process.cwd(); }

	var result = {
        directories: [],
        files: []
    }
    function __appendResult(target, name, type, path){
        var pathSpec = _path.parse(path);
        
        result[target].push({
            name: pathSpec.name,
            fullname: pathSpec.base,
            ext: pathSpec.ext,
            type: type,
            path: path
        });
    }

    var files = _fs.readdirSync(path);
    //files array includes both files and directories
    _.forEach(files, function(item, index, array){
    	var stats = _fs.lstatSync(path + '/' + item);
    	if(stats.isFile()){
            __appendResult("files", item, "f", path + '/' + item);
        }
        else if(stats.isDirectory()){
            __appendResult("directories", item, "d", path + '/' + item);
        }
    });

    return result;

}