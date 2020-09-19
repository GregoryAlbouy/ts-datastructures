import type {
    List,
    ListNode,
    ListMapper,
    ListFilterer,
    ListReducer,
} from './'

type DLLNode<T> = DoublyLinkedListNode<T>

/**
 * DoublyLinkedListNode carries a value and keeps reference of the
 * previous and the next node. It also stores a reference to the `List`
 * it belongs to for checking purposes.
 */
class DoublyLinkedListNode<T> implements ListNode<T> {
    value: T
    prev?: DLLNode<T>
    next?: DLLNode<T>
    list: DoublyLinkedList<T>

    constructor(
        list: DoublyLinkedList<T>,
        value: any,
        prev?: DLLNode<T>,
        next?: DLLNode<T>,
    ) {
        this.list = list
        this.value = value
        this.prev = prev
        this.next = next
    }
}

/**
 * Doubly Linked List implementation with basic operations. It also features
 * some higher order methods, such as `map` `filter` `reduce`.
 */
class DoublyLinkedList<T> implements List<T> {
    length: number = 0
    head?: DLLNode<T>
    tail?: DLLNode<T>

    public push(value: T): DLLNode<T> {
        return this.insertValue(value, this.tail, undefined)!
    }

    public pop(): DLLNode<T> | undefined {
        return this.removeNode(this.tail)
    }

    public unshift(value: T): DLLNode<T> {
        return this.insertValue(value, undefined, this.head)!
    }

    public shift(): DLLNode<T> | undefined {
        return this.removeNode(this.head)
    }

    public insertBefore(value: T, before: DLLNode<T>): DLLNode<T> | undefined {
        if (before.list !== this) return undefined
        return this.insertValue(value, before.prev, before)
    }

    public insertAfter(value: T, after: DLLNode<T>): DLLNode<T> | undefined {
        if (after.list !== this) return undefined
        return this.insertValue(value, after, after.next)
    }

    public has(value: T): boolean {
        return !!this.get(value)
    }

    public get(value: T): ListNode<T> | undefined {
        for (let curr = this.head; curr; curr = curr.next)
            if (curr.value === value) return curr

        return undefined
    }

    public getAll(value: T): ListNode<T>[] {
        const results: ListNode<T>[] = []

        for (let curr = this.head; curr; curr = curr.next)
            if (curr.value === value) results.push(curr)

        return results
    }

    private insertValue(
        value: T,
        prev?: DLLNode<T>,
        next?: DLLNode<T>,
    ): DLLNode<T> | undefined {
        const node = new DoublyLinkedListNode<T>(this, value, prev, next)
        !prev ? this.head = node : prev.next = node
        !next ? this.tail = node : next.prev = node
        this.length++
        return node
    }

    private removeNode(node?: DLLNode<T>): DLLNode<T> | undefined {
        if (!node || !this.head) return undefined

        if (!node.prev) this.head = node.next
        else node.prev!.next = node.next

        if (!node.next) this.tail = node.prev
        else node.next!.prev = node.prev

        this.length--
        return node
    }

    public map<U>(callback: ListMapper<T, U>): List<U> {
        const newList = new DoublyLinkedList<U>()

        for (let curr = this.head; curr; curr = curr.next)
            newList.push(callback(curr.value, curr, (this as unknown as List<T>)))

        return newList
    }

    public filter(callback: ListFilterer<T>): List<T> {
        const newList = new DoublyLinkedList<T>()

        for (let curr = this.head; curr; curr = curr.next) {
            if (callback(curr.value, curr, (this as unknown as List<T>)))
                newList.push(curr.value)
        }

        return newList
    }

    public reduce<U>(callback: ListReducer<T, U>, initialValue: U): U {
        let acc: U = initialValue

        for (let curr = this.head; curr; curr = curr.next)
            acc = callback(acc, curr.value)

        return acc
    }

    public toArray(): T[] {
        const arr: T[] = []
        for (let curr = this.head; curr; curr = curr.next)
            arr.push(curr.value)
        return arr
    }
}

export default DoublyLinkedList
