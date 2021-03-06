(function(){
	'use strict'

	/**
	*
	* @ngdoc factory
	* @module  nodetools
	* @name  execFactory
	*
	* 
	* @description
	* Exposes exec child_processes to angular
	* Very powerful stuff 
	* Users should be familiar with a cli and/or Node's REPL before
	* using within angular
	*/

	angular 
		.module('nodetools')
		.factory('execFactory', factory);


	function factory(){
		var service = {
			newRunner: newRunner
		};


		function newRunner(command, eventHandler){
			//create a new command object and return it
			//back to the caller
			var runner = new ExecRunner(command, eventHandler);
			return runner;
		}


		return service;
	}


	var _ = require("lodash");


	function ExecRunner(command, eventHandler){
		this.command = command;
		this.eventHandler = eventHandler;
		this.stdout = [];
		this.instance = null;
		this.logLimit = 100;
		this.isRunning = false;
	}
	ExecRunner.prototype.run = function(){

		var __addStdOut = function (data){
			if(!this.eventHandler){
				this.stdout.push(data);
				this.stdout = _.takeRight(this.stdout, this.logLimit);
			}
		}.bind(this);

		if(this.instance != null){
			console.log('instance is not null');
			this.kill();
		}

		this.stdout = [];
		var exec = require('child_process').exec;

		this.instance = exec(this.command,
		  function (error, stdout, stderr) {
		}.bind(this));
		
		this.isRunning = true;

		this.instance.stdout.on('data', function (data) {
			__addStdOut(data);
			if(this.eventHandler){
				this.eventHandler("stdout.data", data);
			}
		}.bind(this));

		this.instance.on('close', function (code) {
			//this.stdout.push('child process exited with code ' + code);
			this.isRunning = false;
			if(this.eventHandler){
				this.eventHandler("close", code);
			}
		}.bind(this));

		this.instance.on('exit', function(code){
			//this.stdout.push("exited clientportal-watch with code " + code);
			this.isRunning = false;
			if(this.eventHandler){
				this.eventHandler("exit", code);
			}
			this.instance = null;
		}.bind(this));
	}
	ExecRunner.prototype.kill = function(){
		var execKiller = require("tree-kill");
		
		if(this.instance){
			execKiller(this.instance.pid, 'SIGKILL', function(err) {
			    // Do things 
			});
			//this.instance.kill('SIGTERM');
		}
	}
	ExecRunner.prototype.setCommand = function(command, run){
		this.command = command;
		if(run){ this.run(); }
		else{ if(this.instance){ this.kill(); } }
	}






}());