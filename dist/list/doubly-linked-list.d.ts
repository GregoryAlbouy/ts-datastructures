import type { List, ListNode, ListMapper, ListFilterer, ListReducer } from './';
declare type DLLNode<T> = DoublyLinkedListNode<T>;
declare class DoublyLinkedListNode<T> implements ListNode<T> {
    value: T;
    prev?: DLLNode<T>;
    next?: DLLNode<T>;
    list: DoublyLinkedList<T>;
    constructor(list: DoublyLinkedList<T>, value: any, prev?: DLLNode<T>, next?: DLLNode<T>);
}
declare class DoublyLinkedList<T> implements List<T> {
    length: number;
    head?: DLLNode<T>;
    tail?: DLLNode<T>;
    push(value: T): DLLNode<T>;
    pop(): DLLNode<T> | undefined;
    unshift(value: T): DLLNode<T>;
    shift(): DLLNode<T> | undefined;
    insertBefore(value: T, before: DLLNode<T>): DLLNode<T> | undefined;
    insertAfter(value: T, after: DLLNode<T>): DLLNode<T> | undefined;
    has(value: T): boolean;
    get(value: T): ListNode<T> | undefined;
    getAll(value: T): ListNode<T>[];
    private insertValue;
    private removeNode;
    map<U>(callback: ListMapper<T, U>): List<U>;
    filter(callback: ListFilterer<T>): List<T>;
    reduce<U>(callback: ListReducer<T, U>, initialValue: U): U;
    toArray(): T[];
}
export default DoublyLinkedList;
