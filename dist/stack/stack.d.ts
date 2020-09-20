import { CappedStructure } from '../_shared';
declare class StackNode<T> {
    value: T;
    next?: StackNode<T>;
    constructor(value: T, next?: StackNode<T>);
}
declare class Stack<T> implements CappedStructure {
    length: number;
    capacity: number;
    front?: StackNode<T>;
    constructor(capacity?: number);
    push(value: T): number;
    pop(): T | undefined;
}
export default Stack;
