(function(){
	'use strict'

	angular
		.module('gen')
		.directive('tabItem', tabItem);

	//tabItem.$inject = [];

	function tabItem(){
		var directive = {
	        restrict: 'EA',
	        transclude: true,
	        templateUrl: '/app/gen/components/tabs/tabItem.html',
	        require: "^tabSet",
	        link: link,
	       	scope: {
	       		tabtitle: "@"
	        },
	    };

	    return directive;

	    function link(scope, el, attr, tabctrl) {
	    	scope.active = false;
	    	
	    	tabctrl.addTab(scope);
	    }

	}

}());
