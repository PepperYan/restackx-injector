export default function injectDecorator (clzName) {
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