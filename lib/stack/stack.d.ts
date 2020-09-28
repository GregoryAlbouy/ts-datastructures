import { CappedStructure } from '../_shared';
declare class StackNode<T> {
    value: T;
    next?: StackNode<T>;
    constructor(value: T, next?: StackNode<T>);
}
/**
 * Stack implementation based on a linked list. Its elements are managed
 * by two methods `push` and `pop`. It implements the CappedStructure
 * interface to handle overflow of a `capacity` is set.
 */
declare class Stack<T> implements CappedStructure {
    /**
     * The current amount of elements.
     */
    length: number;
    /**
     * The maximum elements the structure can contain.
     * It can be set via the constructor or `setCapacity`.
     * Default value is `-1` (no limit).
     */
    capacity: number;
    front?: StackNode<T>;
    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the Stack won't accept new elements after the lengths reache
     * the capacity, until an element is removed.
     * @param capacity - The maximum queue length before overflow.
     */
    constructor(capacity?: number);
    /**
     * Adds an element to the front of the stack and returns its length.
     * If the length already reached the (optional) capacity, push is not
     * performed and returns -1.
     *
     * @param value - The value associed to the pushed element.
     * @returns The length of the current Queue after insertion,
     * or `-1` if it failed.
     */
    push(value: T): number;
    /**
     * Removes the first element and returns its value or `undefined` if it
     * failed (empty stack).
     *
     * @returns The value of the removed element or `undefined` if it failed.
     */
    pop(): T | undefined;
}
export { Stack };
