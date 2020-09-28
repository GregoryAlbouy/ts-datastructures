import {
    CappedStructure,
    guardOverflow,
} from '../_shared'
import { BinaryHeap } from '../heap'

/**
 * Represents an element of a `PriorityQueue`. It associates a value with a priority.
 */
class PriorityQueueNode<T> {
    value: T
    priority: number

    constructor(value: T, priority: number) {
        this.value = value
        this.priority = priority
    }
}

/**
 * Priority Queue implementation based on a binary heap. It has two methods
 * `enqueue` and `dequeue` to manage its elements. It implements
 * the CappedStructure interface to handle overflow of a `capacity` is set.
 */
class PriorityQueue<T> implements CappedStructure {
    public values: BinaryHeap<PriorityQueueNode<T>>
    public capacity = -1

    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the PriorityQueue won't accept new elements when the lengths reaches
     * the capacity, until it is dequeued.
     *
     * @param capacity - The maximum queue length before overflow.
     */
    constructor(capacity? : number) {
        // higher priority -\> lower priority number, so we set a custom compareFunction
        // to use the BinaryHeap as a min binary heap
        const compareFunction = (a: PriorityQueueNode<T>, b: PriorityQueueNode<T>) => {
            return a.priority < b.priority ? 1 : a.priority > b.priority ? -1 : 0
        }
        this.values = new BinaryHeap<PriorityQueueNode<T>>().setCompareFunction(compareFunction)

        if (capacity && capacity > 0) this.capacity = capacity
    }

    get length() {
        return !this.values ? 0 : this.values.length
    }

    /**
     * Adds a value to the queue. Its position depends on the given priority.
     * If the length already reached the (optional) capacity, enqueue
     * won't perform and return `undefined`.
     *
     * @param value - The value associed to the element.
     * @returns The inserted element or `undefined` if it failed.
     */
    @guardOverflow(false, undefined)
    public enqueue(value: T, priority: number): PriorityQueueNode<T> | undefined {
        const node = new PriorityQueueNode(value, priority)
        return this.values.insert(node)
    }

    /**
     * Removes the element with highest priority
     *
     * @returns The removes element or `undefined` if it failed.
     */
    public dequeue(): PriorityQueueNode<T> | undefined {
        return this.values.shift()
    }
}

export { PriorityQueue }
