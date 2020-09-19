import 'reflect-metadata';
const requiredKey = Symbol('Required');
function Required(target, propKey, paramIndex) {
    const existingRequiredParameters = Reflect.getOwnMetadata(requiredKey, target, propKey) || [];
    existingRequiredParameters.push(paramIndex);
    Reflect.defineMetadata(requiredKey, existingRequiredParameters, target, propKey);
}
function Validate(target, propName, descriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args) {
        const requiredParameters = Reflect.getOwnMetadata(requiredKey, target, propName);
        if (requiredParameters) {
            for (const parameterIndex of requiredParameters) {
                if (parameterIndex >= args.length ||
                    args[parameterIndex] === undefined) {
                    throw new Error('Missing required argument.');
                }
            }
        }
        return method.apply(this, args);
    };
}
export { Required, Validate, };
