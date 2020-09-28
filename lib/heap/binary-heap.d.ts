import type { Comparer, CompareFunction } from '../_shared';
/**
 * Implementation of a Binary Heap that behaves like a max binary heap
 * with numeric values by default. Nevertheless, it can be provided
 * a custom `CompareFunction` to store any type of data, or to
 * use it as a min binary heap for instance.
 */
declare class BinaryHeap<T> implements Comparer<T> {
    private values;
    /**
     * The function used to compare two elements.
     * It is determinant for the heap structure.
     * By default, it compares numbers so it must be replaced with a custom
     * function when storing another data type.
     * It also allows to use a MinBinaryHeap
     *
     * @param a - Element A
     * @param b - Element B
     * @returns `-1` if a \< b, `1` if a \> b, `0` if a === b
     */
    compare: CompareFunction<T>;
    inf: <T_1>(this: any, a: T_1, b: T_1) => boolean;
    sup: <T_1>(this: any, a: T_1, b: T_1) => boolean;
    equal: <T_1>(this: any, a: T_1, b: T_1) => boolean;
    infOrEqual: <T_1>(this: any, a: T_1, b: T_1) => boolean;
    supOrEqual: <T_1>(this: any, a: T_1, b: T_1) => boolean;
    /**
     * Replaces the current compare function with the provided
     * `CompareFunction`. A compare function has the signature:
     * `CompareFunction<T>(a: T, b: T) => -1 | 0 | 1`.
     *
     * To keep its integrity, the tree is fully rebuilt.
     *
     * @param compareFunction - The function to use to compare two values.
     * @returns The tree instance.
     */
    setCompareFunction(compareFunction: CompareFunction<T>): BinaryHeap<T>;
    get length(): number;
    toArray(): T[];
    insert(...values: T[]): T;
    shift(): T | undefined;
    clear(): void;
    private bubbleUp;
    private bubbleDown;
    private swap;
    private hasIndex;
}
export { BinaryHeap };
