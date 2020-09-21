import { CappedStructure } from '../_shared';
declare class QueueNode<T> {
    value: T;
    next?: QueueNode<T>;
    constructor(value: T);
}
declare class Queue<T> implements CappedStructure {
    length: number;
    capacity: number;
    private _first?;
    private _last?;
    constructor(capacity?: number);
    first(): QueueNode<T> | undefined;
    last(): QueueNode<T> | undefined;
    enqueue(value: T): number;
    dequeue(): T | undefined;
}
export default Queue;
