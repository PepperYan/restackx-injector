function injectInstance(classes) {
    var instanceMap = new Map();

    for(var key in classes){
        instanceMap.set(key, classes[key]);
    }
    
    instanceMap.forEach(function (eachInstance, key) {
        
        eachInstance['_injectDecorator__injectObj'] && eachInstance['_injectDecorator__injectObj'].forEach(function (injectObj) {
            if (!instanceMap.get(injectObj.clzName)) {
                throw 'injectName: ' + eachInstance[injectObj.clzName] + ' not found!';
            }
            eachInstance[injectObj.propertyKey] = instanceMap.get(injectObj.clzName);
        });
        delete eachInstance['_injectDecorator__injectObj'];
    });
    
    return instanceMap;
}

function injectDecorator (clzName) {
    return function (target, propertyKey, descriptor) {
        target[propertyKey] = clzName;
        if (!target['_injectDecorator__injectObj']) {
            target['_injectDecorator__injectObj'] = [{propertyKey,clzName}];
        } else {
            target['_injectDecorator__injectObj'].push({propertyKey,clzName});
        }
        descriptor.writable = true;
        descriptor.configurable = true;
        return descriptor;
    };
}

export default injectInstance;
export { injectDecorator as inject };
