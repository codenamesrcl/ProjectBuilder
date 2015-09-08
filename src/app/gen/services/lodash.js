(function(){
	'use strict'

	angular
		.module('gen')
		.factory('lodash', factory);

	factory.$inject = ['$window']

	function factory($window){
		var _ = $window._;
		if(!_){ throw "lodash library not found in global scope, please include the lodash library" }
	 	delete( $window._ ); //delete the global lodash instance to prevent intersections

		return _;
	}

}());