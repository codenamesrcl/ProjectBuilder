(function(){
	'use strict'

	angular
		.module('manager')
		.controller('angularTab', controller);

	controller.$inject = ['appConfig.builderConfig'];

	function controller(builderConfig){
		var vm = this;
			
		vm.childProcessList = builderConfig.builders;


		function init(){
			console.log(vm.childProcessList);
		}
		init();

	}

}());