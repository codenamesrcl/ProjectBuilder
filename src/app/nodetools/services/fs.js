(function () {
    'use strict';

    /**
     *
     * @ngdoc factory
     * @module nodetools
     * @name nodetools.fs
     * 
     * 
     * @description
     * Exposes some basic filesystem operations
     * to angular
     */
    angular
        .module('nodetools')
        .factory('nodetools.fs', fs);

    //fs.$inject = ['$q'];

    function fs() {
        var builderScanner = require(process.cwd() + '/lib/utility/builderScanner');

        var service = {
       		getDirectoryContents: builderScanner.getDirectoryContents,
        };

        return service;

    }
})();