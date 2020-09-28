"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = void 0;
/**
 * DoublyLinkedListNode carries a value and keeps reference of the
 * previous and the next node. It also stores a reference to the `List`
 * it belongs to for checking purposes.
 */
class DoublyLinkedListNode {
    constructor(list, value, prev, next) {
        this.list = list;
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}
/**
 * Doubly Linked List implementation with basic operations. It also features
 * some higher order methods, such as `map` `filter` `reduce`.
 */
class DoublyLinkedList {
    constructor() {
        this.length = 0;
    }
    push(value) {
        return this.insertValue(value, this.tail, undefined);
    }
    pop() {
        return this.removeNode(this.tail);
    }
    unshift(value) {
        return this.insertValue(value, undefined, this.head);
    }
    shift() {
        return this.removeNode(this.head);
    }
    insertBefore(value, before) {
        if (before.list !== this)
            return undefined;
        return this.insertValue(value, before.prev, before);
    }
    insertAfter(value, after) {
        if (after.list !== this)
            return undefined;
        return this.insertValue(value, after, after.next);
    }
    has(value) {
        return !!this.get(value);
    }
    get(value) {
        for (let curr = this.head; curr; curr = curr.next)
            if (curr.value === value)
                return curr;
        return undefined;
    }
    getAll(value) {
        const results = [];
        for (let curr = this.head; curr; curr = curr.next)
            if (curr.value === value)
                results.push(curr);
        return results;
    }
    insertValue(value, prev, next) {
        const node = new DoublyLinkedListNode(this, value, prev, next);
        !prev ? this.head = node : prev.next = node;
        !next ? this.tail = node : next.prev = node;
        this.length++;
        return node;
    }
    removeNode(node) {
        if (!node || !this.head)
            return undefined;
        if (!node.prev)
            this.head = node.next;
        else
            node.prev.next = node.next;
        if (!node.next)
            this.tail = node.prev;
        else
            node.next.prev = node.prev;
        this.length--;
        return node;
    }
    map(callback) {
        const newList = new DoublyLinkedList();
        for (let curr = this.head; curr; curr = curr.next)
            newList.push(callback(curr.value, curr, this));
        return newList;
    }
    filter(callback) {
        const newList = new DoublyLinkedList();
        for (let curr = this.head; curr; curr = curr.next) {
            if (callback(curr.value, curr, this))
                newList.push(curr.value);
        }
        return newList;
    }
    reduce(callback, initialValue) {
        let acc = initialValue;
        for (let curr = this.head; curr; curr = curr.next)
            acc = callback(acc, curr.value);
        return acc;
    }
    toArray() {
        const arr = [];
        for (let curr = this.head; curr; curr = curr.next)
            arr.push(curr.value);
        return arr;
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
