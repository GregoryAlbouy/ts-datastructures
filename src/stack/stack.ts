import {
    CappedStructure,
    guardOverflow,
} from '../_shared'

class StackNode<T> {
    value: T
    next?: StackNode<T>

    constructor(value: T, next?: StackNode<T>) {
        this.value = value
        this.next = next
    }
}

/**
 * Stack implementation based on a linked list. Its elements are managed
 * by two methods `push` and `pop`. It implements the CappedStructure
 * interface to handle overflow of a `capacity` is set.
 */
class Stack<T> implements CappedStructure {
    length = 0
    capacity = -1
    front?: StackNode<T>

    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the Stack won't accept new elements after the lengths reache
     * the capacity, until an element is removed.
     * @param capacity (optional) The maximum queue length before overflow.
     */
    constructor(capacity?: number) {
        if (capacity && capacity > 0) this.capacity = capacity
    }

    /**
     * Adds an element to the front of the stack and returns its length.
     * If the length already reached the (optional) capacity, push is not
     * performed and returns -1.
     *
     * @param value The value associed to the pushed element.
     * @returns The length of the current Queue after insertion,
     * or `-1` if it failed.
     */
    @guardOverflow(false, -1)
    public push(value: T): number {
        const node = new StackNode(value, this.front)
        this.front = node
        return ++this.length
    }

    /**
     * Removes the first element and returns its value or `undefined` if it
     * failed (empty stack).
     *
     * @returns The value of the removed element or `undefined` if it failed.
     */
    public pop(): T | undefined {
        if (!this.front) return undefined
        const value = this.front.value
        this.front = this.front.next
        this.length--
        return value
    }
}

export default Stack
