(function(){
	'use strict'

	angular
		.module('manager')
		.directive('childProcess', directive);

	directive.$inject = ['lodash'];

	function directive(_){
		var directive = {
	        restrict: 'EA',
	        templateUrl: '/app/manager/components/childProcess/childProcess.html',
	        scope: {
	        	directivename: '@',
	        	parentdirective: '@',
	        	processname: "@",
	        	outputlimit: '@',
	        	command: "@"
	        },
	        link: link,
	        controller: Controller,
	        controllerAs: 'vm',
	        bindToController: true
	    };

	    return directive;

	    function link(scope, el, attr) {

	    }

	}

	Controller.$inject = ['lodash', 'execFactory', '$scope']

	function Controller(_, execFactory, $scope) {
	    var vm = this;
	    vm.stdout = [];

	   	vm.started = false;
	    vm.visible = false;

	    /**
	     * vm.outputlimit
	     * vm.command
	     */
	    var eventHandler = function(eventtype, data){
	    	switch(eventtype){
	    		case "stdout.data":
	    			_appendStdOut(data);
	    			break;
	    		case "close":
	    			vm.status = "idle";	
	    			_execRunner.kill();
	    			vm.started = false;
	    			_appendStdOut("process closed with code " + data);
	    			break;
	    		case 'exit':
	    			vm.status = "idle";	
	    			_execRunner.kill();
	    			vm.started = false;
	    			_appendStdOut("process exited with code " + data);
	    			break;
	    	}
	    	$scope.$digest();
	    }
	    function _appendStdOut(data){
	    	data = _.filter(data.split('\n'), function(item, index){
	    		if(item.trim().length > 0){
	    			return item;
	    		}
	    	});
	    	_.forEach(data, function(item, index){
	    		vm.stdout.push({
					id: -1,
					data: item
				});	
	    	});
	    	
			vm.stdout = _.map(_.takeRight(vm.stdout, vm.outputlimit), function(item, index){
				item.id = index;
				return item;
			})
	    }

	    var _execRunner = execFactory.newRunner(vm.command, eventHandler);


	    vm.toggleVisiblity = function(){
	    	vm.visible = !vm.visible;
	    }

	    vm.toggleStart = function(){
	    	if(vm.started){	
	    		_execRunner.kill();
	    	}
	    	else{
	    		_execRunner.run();
	    	}
	    	vm.started = !vm.started;
	    }
	    vm.btnStartText = function(){
	    	return vm.started ? 'Stop' : 'Start';
	    }
	    vm.txtStatus = function(){
	    	return vm.started ? 'Running' : 'Idle';
	    }



	    init();
	    function init(){
	    	vm.processname = vm.processname || "Process";
	    	vm.outputlimit = _.parseInt(vm.outputlimit || '100');
	    	_execRunner.setCommand(vm.command, false);
	    }

	}

}());
