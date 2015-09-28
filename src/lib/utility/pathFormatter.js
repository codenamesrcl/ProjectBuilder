function __normalizePath(value){
    if(!_.endsWith(value, '/')){
        value += '/';
    }

    return value;
}
function __normalizeRootPaths(config){
    config.srcRoot = __normalizePath(config.srcRoot);
    config.cacheRoot = __normalizePath(config.cacheRoot);
    config.destPath = __normalizePath(config.destPath);

    return config;
}

module.exports = {
		
}