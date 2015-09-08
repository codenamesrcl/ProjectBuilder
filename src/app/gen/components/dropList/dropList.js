(function(){
	'use strict'

	angular
		.module('gen')
		.directive('dropList', dropList);

	//dropList.$inject = [];

	function dropList(){
		var directive = {
	        restrict: 'EA',
	        templateUrl: '/app/gen/components/dropList/dropList.html',
	        transclude: true,
	        scope: true,
	        link: link,
	        controller: DropListController,
	        controllerAs: 'vm',
	        bindToController: true // because the scope is isolated
	    };

	    return directive;

	    function link(scope, el, attr) {
	    	if(attr.hasOwnProperty("header")){
	    		scope.vm.setTitle(attr.header);
	    	}
	    }

	}

	function DropListController() {
	    var vm = this;
	    vm.show = false;
	    vm.title = "";
	    vm.buttonText = "+";

	    vm.toggleShow = function(){
	    	vm.show = !vm.show;
	    	vm.buttonText = (vm.show) ? "-" : "+";
	    }
	    vm.setTitle = function(value){
	    	vm.title = value;
	    }
	}

}());