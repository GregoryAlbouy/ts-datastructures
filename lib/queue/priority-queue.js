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
exports.PriorityQueue = void 0;
const _shared_1 = require("../_shared");
const heap_1 = require("../heap");
/**
 * Represents an element of a `PriorityQueue`. It associates a value with a priority.
 */
class PriorityQueueNode {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}
/**
 * Priority Queue implementation based on a binary heap. It has two methods
 * `enqueue` and `dequeue` to manage its elements. It implements
 * the CappedStructure interface to handle overflow of a `capacity` is set.
 */
class PriorityQueue {
    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the PriorityQueue won't accept new elements when the lengths reaches
     * the capacity, until it is dequeued.
     *
     * @param capacity - The maximum queue length before overflow.
     */
    constructor(capacity) {
        /**
         * The maximum elements the structure can contain.
         * It can be set via the constructor or `setCapacity`.
         * Default value is `-1` (no limit).
         */
        this.capacity = -1;
        // higher priority -\> lower priority number, so we set a custom compareFunction
        // to use the BinaryHeap as a min binary heap
        const compareFunction = (a, b) => {
            return a.priority < b.priority ? 1 : a.priority > b.priority ? -1 : 0;
        };
        this.values = new heap_1.BinaryHeap().setCompareFunction(compareFunction);
        if (capacity && capacity > 0)
            this.capacity = capacity;
    }
    /**
     * The current amount of elements.
     */
    get length() {
        return !this.values ? 0 : this.values.length;
    }
    /**
     * Adds a value to the queue. Its position depends on the given priority.
     * If the length already reached the (optional) capacity, enqueue
     * won't perform and return `undefined`.
     *
     * @param value - The value associed to the element.
     * @returns The inserted element or `undefined` if it failed.
     */
    enqueue(value, priority) {
        const node = new PriorityQueueNode(value, priority);
        return this.values.insert(node);
    }
    /**
     * Removes the element with highest priority
     *
     * @returns The removes element or `undefined` if it failed.
     */
    dequeue() {
        return this.values.shift();
    }
}
__decorate([
    _shared_1.guardOverflow(false, undefined),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Object)
], PriorityQueue.prototype, "enqueue", null);
exports.PriorityQueue = PriorityQueue;
