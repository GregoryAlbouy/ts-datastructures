"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardOverflow = void 0;
/**
 * Method decorator that prevents a structure from overflowing. The structure
 * must implement CappedStructure interface. In case of overflow, it throws
 * an error if `throwError` parameter is set to `true`, or returns the
 * specified `returnValue` otherwise.
 *
 * @param throwError - Whether it should throw an error or not in case of overflow
 * @param returnValue - The value to be returned in case of overflow, if `throwError`
 * is set to `false` (it is ignored otherwise)
 */
function guardOverflow(throwError, returnValue) {
    return (target, methodName, descriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            if (!this.capacity ||
                this.capacity < 0 ||
                this.length < this.capacity)
                return method.apply(this, args);
            if (throwError)
                throw new Error(`${target.constructor.name}.${methodName}: insertion aborted (limit of ${this.length} reached)`);
            return returnValue;
        };
    };
}
exports.guardOverflow = guardOverflow;
