"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const _shared_1 = require("../_shared");
/**
 * Represents an element of a `Queue`, wrapping a given value.
 */
class QueueNode {
    constructor(value) {
        this.value = value;
    }
}
/**
 * Queue implementation based on a linked list. It has two methods
 * `enqueue` and `dequeue` to manage its elements. It implements
 * the CappedStructure interface to handle overflow of a `capacity` is set.
 */
class Queue {
    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the Queue won't accept new elements when the lengths reaches the
     * capacity, until it is dequeued.

     * @param capacity - The maximum queue length before overflow.
     */
    constructor(capacity) {
        /**
         * The current amount of elements.
         */
        this.length = 0;
        /**
         * The maximum elements the structure can contain.
         * It can be set via the constructor or `setCapacity`.
         * Default value is `-1` (no limit).
         */
        this.capacity = -1;
        if (capacity && capacity > 0)
            this.capacity = capacity;
    }
    /**
     * Returns the first element.
     */
    first() {
        return this._first;
    }
    /**
     * Returns the last element.
     */
    last() {
        return this._last;
    }
    /**
     * Adds an element to the end of the list and returns its length.
     * If the length already reached the (optional) capacity, enqueue
     * won't perform and return -1.
     *
     * @param value - The value associed to the element.
     * @returns The length of the current Queue after insertion,
     * or `-1` if it failed.
     */
    enqueue(value) {
        const node = new QueueNode(value);
        if (!this._first)
            this._first = node;
        if (this._last)
            this._last.next = node;
        this._last = node;
        return ++this.length;
    }
    /**
     * Removes the first element of the list.
     *
     * @returns The value of the element removed.
     */
    dequeue() {
        if (!this._first)
            return undefined;
        if (!this._first.next)
            this._last = undefined;
        const value = this._first.value;
        this._first = this._first.next;
        this.length--;
        return value;
    }
}
__decorate([
    _shared_1.guardOverflow(false, -1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Number)
], Queue.prototype, "enqueue", null);
exports.Queue = Queue;
