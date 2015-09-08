# ProjectBuilder
v0.0.1 pre alpha
An angular/sass project build manager using mainly nwjs and gulp

In theory you really only need gulp, the angular GUI can be served by other methods
	- Browsers (via express/sails/any other server framework)
	- Electron (I haven't used it before but it's basic premise is similar to nwjs, with a little tweaking it should be doable)

This application relies on gulp for the build process and nwjs for the GUI.  The nwjs GUI is built using angular and angular-bootstrap.

The builders rely on a set of build configuration files located in the /builders folder, an example has been provided that was used to build the angular GUI for the application using both a watcher task as well as a run-once build task for both developer and production level builds.

Right now only the angular builder is set up for actual use

TODO:
	- Actual documentation
	- Less/Sass script integration (I have the script loose for now elsewhere)
	- JS Linter (I have the script loose for now elsewhere)
	- Documentation generation (probably via angular-jsdoc for angular and sassdoc for sass, considering other options)
	- Git integration (via gulp-git)
	- Various other nice build tasks
		- Json prettification (again, loose script for now)
		- Testing REPL for node/javascript micro library development

	Will likely come up with more items later as this app evolves