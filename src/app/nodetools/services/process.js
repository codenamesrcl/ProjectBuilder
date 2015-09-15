(function () {
    'use strict';

    /**
     *
     * @ngdoc factory
     * @module  nodetools
     * @name  nodetools.process
     * 
     * @requires  $q
     * 
     * @description
     * Exposes aspects of node's process module to angular
     */
    angular
        .module('nodetools')
        .factory('nodetools.process', Process);

    Process.$inject = ['$q'];

    function Process($q) {
        var service = {
       		getCwd: function(){ return process.cwd(); }
        };

        return service;

    }
})();