//absolute file path to the project root
//can also be refered to as the project working directory
var project_root = ""; 

var builderFactory = require(process.cwd() + '/builders/baseBuilder/builderFactory');

var _buildPath = '/app/_builds/';

var angularConfig = {
    gen: builderFactory.create('gen', project_root, '/app/gen/', _buildPath),
    manager: builderFactory.create('manager', project_root, '/app/manager/', _buildPath),
    nodetools: builderFactory.create('nodetools', project_root, '/app/nodetools/', _buildPath)
}


module.exports = {
    config: {
        angular: angularConfig,
        sass: {},
    },
    projectPath: project_root
};