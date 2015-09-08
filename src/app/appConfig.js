(function () {
    'use strict';

    angular.module('appConfig', [
        // Angular modules 

        // Custom modules 

        // 3rd Party Modules
        
    ]);

}());

(function(){
	'use strict'

	angular
		.module('appConfig')
		.factory('appConfig.builderConfig', factory);

	factory.$inject = [];

	function factory(){
		var service = {
			builders: []
		};

		service.builders = [
			new BuilderConf("Project Builder", "projectBuilder")
		];


		return service;

	}

	function BuilderConf(name, baseCommand){
		this.name = name;
		this.baseCommand = baseCommand;
		this.commandSetup = "gulp " + baseCommand + '-setup';
		this.commandBuildDev = "gulp " + baseCommand + '-build-dev';
		this.commandBuildProd = "gulp " + baseCommand + '-build-prod';
	}

}());