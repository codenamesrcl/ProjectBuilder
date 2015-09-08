(function(){
	'use strict'

	angular
		.module('gen')
		.directive('tabSet', tabSet);

	//tabSet.$inject = [];

	function tabSet(){
		var directive = {
	        restrict: 'EA',
	        transclude: true,
	        templateUrl: '/app/gen/components/tabs/tabSet.html',
	        link: link,
	        controller: TabSetController,
	        controllerAs: 'tabset',
	        bindToController: true, // because the scope is isolated
	       	scope: {
	       		
	        },
	    };

	    return directive;

	    function link(scope, el, attr, ctrl) {

	    }

	}

	function TabSetController() {
	    var vm = this;
	    vm.tabs = [];
	    vm.addTab = function(tab){
	    	vm.tabs.push(tab);

	    	//set the first tab to active
	    	if(vm.tabs.length === 1){
	    		tab.active = true;
	    	}
	    }
	    vm.select = function(selected){
	    	angular.forEach(vm.tabs, function(tab){
	    		if(tab.active && tab !== selected){
	    			tab.active = false;
	    		}
	    	});

	    	selected.active = true;
	    }
	}

}());

