(function () {
    'use strict';

    /**
     *
     * @ngdoc factory
     * @module nodetools
     * @name nodetools.fs
     * 
     * @requires  $q
     * 
     * @description
     * A generic angular factory
     */
    angular
        .module('nodetools')
        .factory('nodetools.fs', fs);

    fs.$inject = ['$q'];

    function fs($q) {
        var service = {
       		getDirectoryContents: getDirectoryContents,
        };

        var _fs = require("fs");
        var _ = require("lodash");
        var _path = require("path");

        function getDirectoryContents(path){
            if(!path){ path = process.cwd(); }

            var deferred = $q.defer();

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


        return service;

    }
})();