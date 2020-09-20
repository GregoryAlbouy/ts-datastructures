function guardOverflow(throwError, returnValue) {
    return (target, methodName, descriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            if (this.length !== this.capacity)
                return method.apply(this, args);
            if (throwError)
                throw new Error(`${target}.${methodName}: insertion aborted (limit of ${this.length} reached)`);
            return returnValue;
        };
    };
}
export { guardOverflow, };
