/**
 * A CappedStructure has a `length` and a `capacity`, allowing it to use
 * the `guardOverflow` decorator on insertion methods to prevent overflow.
 */
interface CappedStructure {
    length: number
    capacity: number
}

/**
 * Method decorator that prevents a structure from overflowing. The structure
 * must implement CappedStructure interface. In case of overflow, it throws
 * an error if `throwError` parameter is set to `true`, or returns the
 * specified `returnValue` otherwise.
 *
 * @param throwError Whether it should throw an error or not in case of overflow
 * @param returnValue The value to be returned in case of overflow, if `throwError`
 * is set to `false` (it is ignored otherwise)
 */
function guardOverflow(throwError: boolean, returnValue?: any) {
    return (target: Object, methodName: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value

        descriptor.value = function(this: CappedStructure, ...args: any): typeof returnValue {
            if (!this.capacity ||
                this.capacity < 0 ||
                this.length < this.capacity
            ) return method.apply(this, args)

            if (throwError)
                throw new Error(`${target}.${methodName}: insertion aborted (limit of ${this.length} reached)`)

            return returnValue
        }
    }
}

export default CappedStructure
export {
    guardOverflow,
}
