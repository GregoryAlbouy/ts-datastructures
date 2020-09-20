interface CappedStructure {
    length: number;
    capacity: number;
}
declare function guardOverflow(throwError: boolean, returnValue: any): (target: Object, methodName: string, descriptor: PropertyDescriptor) => void;
export default CappedStructure;
export { guardOverflow, };
