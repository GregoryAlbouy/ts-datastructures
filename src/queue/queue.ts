import {
    CappedStructure,
    guardOverflow,
} from '../_shared'

/**
 * Represents an element of a `Queue`, wrapping a given value.
 */
class QueueNode<T> {
    value: T
    next?: QueueNode<T>

    constructor(value: T) {
        this.value = value
    }
}

/**
 * Queue implementation based on a linked list. It has two methods
 * `enqueue` and `dequeue` to manage its elements. It implements
 * the CappedStructure interface to handle overflow of a `capacity` is set.
 */
class Queue<T> implements CappedStructure {
    public length = 0
    public capacity = -1
    private _first?: QueueNode<T>
    private _last?: QueueNode<T>

    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the Queue won't accept new elements when the lengths reaches the
     * capacity, until it is dequeued.

     * @param capacity The maximum queue length before overflow.
     */
    constructor(capacity?: number) {
        if (capacity && capacity > 0) this.capacity = capacity
    }

    /**
     * Returns the first element.
     */
    public first() {
        return this._first
    }

    /**
     * Returns the last element.
     */
    public last() {
        return this._last
    }

    /**
     * Adds an element to the end of the list and returns its length.
     * If the length already reached the (optional) capacity, enqueue
     * won't perform and return -1.
     *
     * @param value The value associed to the element.
     * @returns The length of the current Queue after insertion,
     * or `-1` if it failed.
     */
    @guardOverflow(false, -1)
    public enqueue(value: T): number {
        const node = new QueueNode(value)

        if (!this._first) this._first = node
        if (this._last) this._last.next = node
        this._last = node
        return ++this.length
    }

    /**
     * Removes the first element of the list.
     *
     * @returns The value of the element removed.
     */
    public dequeue(): T | undefined {
        if (!this._first) return undefined
        if (!this._first.next) this._last = undefined
        const value = this._first.value
        this._first = this._first.next
        return value
    }
}

export default Queue
