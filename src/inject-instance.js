export default function injectInstance(classes) {
    var instanceMap = new Map();

    for(var key in classes){
        instanceMap.set(key, classes[key]);
    }
    
    instanceMap.forEach(function (eachInstance, key) {
        
        var injectInstances = [];
        // var instanceClass = classMap.get(key);
        eachInstance['_injectDecorator__injectObj'] && eachInstance['_injectDecorator__injectObj'].forEach(function (injectObj) {
            if (!instanceMap.get(injectObj.clzName)) {
                throw 'injectName: ' + eachInstance[injectObj.clzName] + ' not found!';
            }
            eachInstance[injectObj.propertyKey] = instanceMap.get(injectObj.clzName);
        });
        delete eachInstance['_injectDecorator__injectObj'];
    });
    
    return instanceMap;
};