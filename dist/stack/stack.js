var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { guardOverflow, } from '../_shared';
class StackNode {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}
class Stack {
    constructor(capacity) {
        this.length = 0;
        this.capacity = -1;
        if (capacity && capacity > 0)
            this.capacity = capacity;
    }
    push(value) {
        const node = new StackNode(value, this.front);
        this.front = node;
        return ++this.length;
    }
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
    guardOverflow(false, -1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Number)
], Stack.prototype, "push", null);
export default Stack;
