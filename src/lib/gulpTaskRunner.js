var _cwd = process.cwd();

var angularCompiler = require(_cwd + '/lib/angular/angular-builder');

/**
 * Execute the build process for a development build
 * @param  {string} name [name of the builder to execute]
 * @return {void}
 */
function buildDev(name){
    var builder = require(_cwd + '/builders/' + name);
    angularCompiler.groupCompile(builder.config.angular, "dev");
}

/**
 * Execute the build process for a production build
 * @param  {string} name [name of the builder to execute]
 * @return {void}
 */
function buildProd(name){
    var builder = require(_cwd + '/builders/' + name);
    angularCompiler.groupCompile(builder.config.angular, "prod");       
}

function soloBuild(builder, name){
	angularCompiler.soloCompile(builder, name, 'dev')
}

module.exports = {
	groupBuildDev: buildDev,
	groupBuildProd: buildProd,
	soloBuild: soloBuild,
}