import { CappedStructure } from '../_shared';
import { BinaryHeap } from '../heap';
/**
 * Represents an element of a `PriorityQueue`. It associates a value with a priority.
 */
declare class PriorityQueueNode<T> {
    value: T;
    priority: number;
    constructor(value: T, priority: number);
}
/**
 * Priority Queue implementation based on a binary heap. It has two methods
 * `enqueue` and `dequeue` to manage its elements. It implements
 * the CappedStructure interface to handle overflow of a `capacity` is set.
 */
declare class PriorityQueue<T> implements CappedStructure {
    values: BinaryHeap<PriorityQueueNode<T>>;
    /**
     * The maximum elements the structure can contain.
     * It can be set via the constructor or `setCapacity`.
     * Default value is `-1` (no limit).
     */
    capacity: number;
    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the PriorityQueue won't accept new elements when the lengths reaches
     * the capacity, until it is dequeued.
     *
     * @param capacity - The maximum queue length before overflow.
     */
    constructor(capacity?: number);
    /**
     * The current amount of elements.
     */
    get length(): number;
    /**
     * Adds a value to the queue. Its position depends on the given priority.
     * If the length already reached the (optional) capacity, enqueue
     * won't perform and return `undefined`.
     *
     * @param value - The value associed to the element.
     * @returns The inserted element or `undefined` if it failed.
     */
    enqueue(value: T, priority: number): PriorityQueueNode<T> | undefined;
    /**
     * Removes the element with highest priority
     *
     * @returns The removes element or `undefined` if it failed.
     */
    dequeue(): PriorityQueueNode<T> | undefined;
}
export { PriorityQueue };
