import type { CompareFunction, FilterFunction, MapFunction, ReduceFunction } from '../_shared/types';
declare enum TraverseMethod {
    BFS = 0,
    DFSPreOrder = 1,
    DFSInOrder = 2,
    DFSPostOrder = 3
}
declare class BinarySearchTreeNode<T> {
    value: T;
    left?: BinarySearchTreeNode<T>;
    right?: BinarySearchTreeNode<T>;
    constructor(value: T);
    hasChild(direction: -1 | 1): boolean;
    getChild(direction: -1 | 1): BinarySearchTreeNode<T> | undefined;
    setChild(direction: -1 | 1, newNode: BinarySearchTreeNode<T>): void;
}
declare class BinarySearchTree<T> {
    private _root?;
    private compare;
    private traverseMethods;
    defaultTraverseMethod: TraverseMethod;
    constructor(compareFunction?: CompareFunction<T>);
    root(): BinarySearchTreeNode<T> | undefined;
    setCompareFunction(compareFunction: CompareFunction<T>): void;
    setDefaultTraverseMethod(traverseMethod: TraverseMethod): void;
    insert(value: T): boolean;
    toArray(traverseMethod?: TraverseMethod): T[];
    map<U>(mapFunction: MapFunction<T, U>, traverseMethod?: TraverseMethod, newCompareFunction?: CompareFunction<U>): BinarySearchTree<U>;
    filter(filterFunction: FilterFunction<T>, traverseMethod?: TraverseMethod): BinarySearchTree<T>;
    reduce<U>(reduceFunction: ReduceFunction<T, U>, initialValue: U, traverseMethod?: TraverseMethod): U;
    private traverseBFS;
    private traverseDFS;
    private traversePreOrder;
    private traverseInOrder;
    private traversePostOrder;
}
export default BinarySearchTree;
export { TraverseMethod };
