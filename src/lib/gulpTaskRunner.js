var _cwd = process.cwd();

var angularCompiler = require(_cwd + '/lib/angular/angular-builder');
var sassCompiler = require(_cwd + "/lib/sass/sass-builder");

/**
 * Execute the build process for a development build
 * @param  {string} name [name of the builder to execute]
 * @return {void}
 */
function angular_buildDev(name){
    var builder = require(_cwd + '/builders/' + name);
    angularCompiler.groupCompile(builder.config.angular, "dev");
}

/**
 * Execute the build process for a production build
 * @param  {string} name [name of the builder to execute]
 * @return {void}
 */
function angular_buildProd(name){
    var builder = require(_cwd + '/builders/' + name);
    angularCompiler.groupCompile(builder.config.angular, "prod");       
}

function angular_soloBuild(builder, name){
	angularCompiler.soloCompile(builder, name, 'dev')
}

function sass_soloBuild(builder, name){
	sassCompiler.soloCompile(builder, name, 'dev');
}



module.exports = {
	angular:{
		groupBuildDev: angular_buildDev,
		groupBuildProd: angular_buildProd,
		soloBuild: angular_soloBuild,	
	},
	sass:{
		soloBuilder: sass_soloBuild,
	},
	
}