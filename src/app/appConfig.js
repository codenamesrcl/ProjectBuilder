(function () {
    'use strict';

    angular.module('appConfig', [
        // Angular modules 

        // Custom modules 
        'nodetools'
        // 3rd Party Modules
        
    ]);

}());

(function(){
	'use strict'

	angular
		.module('appConfig')
		.factory('appConfig.builderConfig', factory);

	factory.$inject = ['nodetools.fs', 'nodetools.process'];

	function factory(fs, appProcess){
		var service = {
			builders: []
		};

		console.log(appProcess);

		var cwd = appProcess.getCwd();

		fs.getDirectoryContents(cwd + '/builders').then(
			function(result){
				result.files.forEach(function(item, index, array){
					var conf = new BuilderConf(item.name, item.name);
					service.builders.push(conf);
				})

				console.log(service.builders);
			},
			function(error){
				console.log(error);
			});






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