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
exports.Stack = void 0;
const _shared_1 = require("../_shared");
class StackNode {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}
/**
 * Stack implementation based on a linked list. Its elements are managed
 * by two methods `push` and `pop`. It implements the CappedStructure
 * interface to handle overflow of a `capacity` is set.
 */
class Stack {
    /**
     * Constructor takes an optional `capacity` parameter. If set,
     * the Stack won't accept new elements after the lengths reache
     * the capacity, until an element is removed.
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
     * Adds an element to the front of the stack and returns its length.
     * If the length already reached the (optional) capacity, push is not
     * performed and returns -1.
     *
     * @param value - The value associed to the pushed element.
     * @returns The length of the current Queue after insertion,
     * or `-1` if it failed.
     */
    push(value) {
        const node = new StackNode(value, this.front);
        this.front = node;
        return ++this.length;
    }
    /**
     * Removes the first element and returns its value or `undefined` if it
     * failed (empty stack).
     *
     * @returns The value of the removed element or `undefined` if it failed.
     */
    pop() {
        if (!this.front)
            return undefined;
        const value = this.front.value;
        this.front = this.front.next;
        this.length--;
        return value;
    }
}
__decorate([
    _shared_1.guardOverflow(false, -1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Number)
], Stack.prototype, "push", null);
exports.Stack = Stack;
