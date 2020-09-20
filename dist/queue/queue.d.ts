import { CappedStructure } from '../_shared';
declare class QueueNode<T> {
    value: T;
    next?: QueueNode<T>;
    constructor(value: T);
}
declare class Queue<T> implements CappedStructure {
    length: number;
    capacity: number;
    first?: QueueNode<T>;
    last?: QueueNode<T>;
    constructor(capacity?: number);
    enqueue(value: T): number;
    dequeue(): number;
}
export default Queue;
