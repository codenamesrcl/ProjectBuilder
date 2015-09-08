//absolute file path to the project root
//can also be refered to as the project working directory
var project_root = ""; 

var angularConfig = {
    gen: {
        srcRoot: project_root + "/app/gen/",
        
        cacheRoot: '/app/gen/',

        appModuleName: "gen",

        destPath: project_root + '/app/_builds/'
    },
    manager: {
        srcRoot: project_root + "/app/manager/",
        
        cacheRoot: '/app/manager/',

        appModuleName: "manager",

        destPath: project_root + '/app/_builds/'
    },
    nodetools: {
        srcRoot: project_root + "/app/nodetools/",
        
        cacheRoot: '/app/nodetools/',

        appModuleName: "nodetools",

        destPath: project_root + '/app/_builds/'
    },
}

module.exports = {
    config: {
        angular: angularConfig,
        sass: {},
    },
    projectPath: project_root
};