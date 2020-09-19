import DoublyLinkedList from './doubly-linked-list';
declare type ListMapper<T, U> = (currentValue: T, currentNode?: ListNode<T>, currentList?: List<T>) => U;
declare type ListFilterer<T> = (currentValue: T, currentNode?: ListNode<T>, currentList?: List<T>) => boolean;
declare type ListReducer<T, U> = (accumulator: U, currentValue?: T) => U;
interface ListNode<T> {
    value: T;
    prev?: ListNode<T>;
    next?: ListNode<T>;
}
interface List<T> {
    push(value: T): ListNode<T>;
    pop(): ListNode<T> | undefined;
    unshift(value: T): ListNode<T>;
    shift(): ListNode<T> | undefined;
    insertBefore(value: T, before: ListNode<T>): ListNode<T> | undefined;
    insertAfter(value: T, after: ListNode<T>): ListNode<T> | undefined;
    has(value: T): boolean;
    get(value: T): ListNode<T> | undefined;
    getAll(value: T): ListNode<T>[];
    map<U>(callback: ListMapper<T, U>): List<U>;
    filter(callback: ListFilterer<T>): List<T>;
    reduce<U>(callback: ListReducer<T, U>, initialValue: U): U;
    toArray(): T[];
}
export { DoublyLinkedList, };
export type { List, ListNode, ListMapper, ListFilterer, ListReducer, };
