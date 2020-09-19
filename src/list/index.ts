import DoublyLinkedList from './doubly-linked-list'

type ListMapper<T, U> =
    (currentValue: T, currentNode?: ListNode<T>, currentList?: List<T>) => U

type ListFilterer<T> =
    (currentValue: T, currentNode?: ListNode<T>, currentList?: List<T>) => boolean

type ListReducer<T, U> =
    (accumulator: U, currentValue: T) => U

/**
 * Represents an element of a `List`.
 */
interface ListNode<T> {
    value: T
    prev?: ListNode<T>
    next?: ListNode<T>
}

/**
 * Represents a linked list, that can be a `SinglyLinkedList`
 * or a `DoublyLinkedList`.
 */
interface List<T> {
    /**
     * Adds a `ListNode` with input value at the end of the list.
     * @param value The value attached to the element.
     * @returns The added `ListNode`.
     */
    push(value: T): ListNode<T>

    /**
     * Removes the last element of the list.
     * @returns The removed `ListNode` or `undefined` if nothing was removed.
     */
    pop(): ListNode<T> | undefined

    /**
     * Adds an element with input value at the front of the list.
     * @param value The value attached to the element.
     * @returns The added element.
     */
    unshift(value: T): ListNode<T>

    /**
     * Removes the first element of the list.
     * @returns The removed element or `undefined` if nothing was removed.
     */
    shift(): ListNode<T> | undefined

    /**
     * Inserts a value before a `ListNode`. It fails if it does not belong
     * to the list.
     * @param value The value to be inserted.
     * @param before The target `ListNode`.
     * @returns The inserted `ListNode`, or `undefined` if the insertion failed.
     */
    insertBefore(value: T, before: ListNode<T>): ListNode<T> | undefined

    /**
     * Inserts a value after a `ListNode`. It fails if it does not belong
     * to the list.
     * @param value The value to be inserted.
     * @param after The target `ListNode`.
     * @returns The inserted `ListNode`, or `undefined` if the insertion failed.
     */
    insertAfter(value: T, after: ListNode<T>): ListNode<T> | undefined

    /**
     * Checks whether a value is present in the list.
     * @param value The tested value.
     * @returns `true` if the value is found, `false` otherwise
     */
    has(value: T): boolean

    /**
     * Returns the first encountered element with matching value.
     * @param value The tested value.
     * @returns The first matching `ListNode`, `undefined` if no match.
     */
    get(value: T): ListNode<T> | undefined

    /**
     * Returns an array of all encountered elements with matching value.
     * @param value The tested value.
     * @returns An array of matching elements.
     */
    getAll(value: T): ListNode<T>[]

    /**
     * Applies a transformation on each element and returns a new `List`.
     * The original `List` remains unaltered.
     * @param callback The map function.
     * @returns The new `List`
     */
    map<U>(callback: ListMapper<T, U>): List<U>

    /**
     * Filters out elements and returns a new `List`
     * The original `Lise` remains unaltered.
     * @param callback The filter function.
     * @returns The new `List`
     */
    filter(callback: ListFilterer<T>): List<T>

    /**
     * Accumulates the result of specific operation on each value and
     * returns the accumulation as a single result.
     * The original `List` remains unaltered.
     * @param callback The filter function.
     * @returns The new `List`.
     */
    reduce<U>(callback: ListReducer<T, U>, initialValue: U): U

    /**
     * Creates an array from the `List` values.
     * @returns The array of `List` values.
     */
    toArray(): T[]
}

export {
    DoublyLinkedList,
}

export type {
    List,
    ListNode,
    ListMapper,
    ListFilterer,
    ListReducer,
}
