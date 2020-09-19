class QueueNode<T> {
    value: T
    next?: QueueNode<T>

    constructor(value: T) {
        this.value = value
    }
}

/**
 * Queue implementation based on a linked list. It has two methods
 * `enqueue` and `dequeue` to manage its elements.
 */
class Queue<T> {
    length = 0
    capacity?: number
    first?: QueueNode<T>
    last?: QueueNode<T>

    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the Queue won't accept new elements when the lengths reaches the
     * capacity, until it is dequeued.
     * @param capacity (optional) The maximum queue length before overflow.
     */
    constructor(capacity?: number) {
        this.capacity = capacity
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
    public enqueue(value: T): number {
        if (this.overflow()) return -1

        const node = new QueueNode(value)

        if (!this.first) this.first = node
        if (this.last) this.last.next = node
        this.last = node
        return ++this.length
    }

    /**
     * Removes the first element of the list.
     *
     * @returns The length of the list after removal, or `-1` if already empty.
     */
    public dequeue(): number {
        if (!this.first) return 0
        if (!this.first.next) this.last = undefined
        this.first = this.first.next
        return --this.length
    }

    private overflow() {
        return this.length === this.capacity
    }
}

export default Queue
