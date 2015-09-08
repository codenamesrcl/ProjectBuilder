(function () {
    'use strict';

    /**
     *
     * @ngdoc module
     * @module  manager
     * @name  manager
     * 
     * 
     * @description
     * A generic angular module
     */
    var app = angular.module('manager', [
        // Angular modules 
        'ngAnimate',
        //'ngRoute'
        //'ngSanitize',
        // Custom modules 
        "gen",       
        "nodetools", 
        "appConfig",
        'ui.bootstrap'
        // 3rd Party Modules
    ]);

    app.constant('appContext', {
        
    });

    app.run(onRun);

    //onRun.$inject = [];

    function onRun() {

    }

})();
