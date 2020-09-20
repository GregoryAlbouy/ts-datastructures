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
class QueueNode {
    constructor(value) {
        this.value = value;
    }
}
class Queue {
    constructor(capacity) {
        this.length = 0;
        this.capacity = -1;
        if (capacity && capacity > 0)
            this.capacity = capacity;
    }
    enqueue(value) {
        const node = new QueueNode(value);
        if (!this.first)
            this.first = node;
        if (this.last)
            this.last.next = node;
        this.last = node;
        return ++this.length;
    }
    dequeue() {
        if (!this.first)
            return 0;
        if (!this.first.next)
            this.last = undefined;
        this.first = this.first.next;
        return --this.length;
    }
}
__decorate([
    guardOverflow(false, -1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Number)
], Queue.prototype, "enqueue", null);
export default Queue;
