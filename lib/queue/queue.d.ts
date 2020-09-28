import { CappedStructure } from '../_shared';
/**
 * Represents an element of a `Queue`, wrapping a given value.
 */
declare class QueueNode<T> {
    value: T;
    next?: QueueNode<T>;
    constructor(value: T);
}
/**
 * Queue implementation based on a linked list. It has two methods
 * `enqueue` and `dequeue` to manage its elements. It implements
 * the CappedStructure interface to handle overflow of a `capacity` is set.
 */
declare class Queue<T> implements CappedStructure {
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
    private _first?;
    private _last?;
    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the Queue won't accept new elements when the lengths reaches the
     * capacity, until it is dequeued.

     * @param capacity - The maximum queue length before overflow.
     */
    constructor(capacity?: number);
    /**
     * Returns the first element.
     */
    first(): QueueNode<T> | undefined;
    /**
     * Returns the last element.
     */
    last(): QueueNode<T> | undefined;
    /**
     * Adds an element to the end of the list and returns its length.
     * If the length already reached the (optional) capacity, enqueue
     * won't perform and return -1.
     *
     * @param value - The value associed to the element.
     * @returns The length of the current Queue after insertion,
     * or `-1` if it failed.
     */
    enqueue(value: T): number;
    /**
     * Removes the first element of the list.
     *
     * @returns The value of the element removed.
     */
    dequeue(): T | undefined;
}
export { Queue };
