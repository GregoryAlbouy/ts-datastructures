import type { Comparer, CompareFunction, FilterFunction, MapFunction, ReduceFunction } from '../_shared';
import { TraverseMethod } from '../_shared';
/**
 * Represents a single element of a tree. Carrying a given value,
 * it is linked to maximum two child nodes via `left` and `right`
 * fields.
 */
declare class BinarySearchTreeNode<T> {
    value: T;
    left?: BinarySearchTreeNode<T>;
    right?: BinarySearchTreeNode<T>;
    constructor(value: T);
    /**
     * Whether the current node has a child in the given direction.
     *
     * Values `-1` (left) or `1` (right) for the direction input are used
     * for convenience, as it is the direct result of the `CompareFunction`.
     * Case `0` is not treated as it is considered already checked.
     *
     * @param direction - `-1` (left) / `1` (right).
     * @returns `true` / `false`.
     */
    hasChild(direction: -1 | 1): boolean;
    /**
     * Returns the current node's child in the given direction
     * (can be `undefined`).
     *
     * Values `-1` (left) or `1` (right) for the direction input are used
     * for convenience, as it is the direct result of the `CompareFunction`.
     * Case `0` is not treated as it is considered already checked.
     *
     * @param direction - `-1` (left) / `1` (right).
     * @returns a child `BinarySearchTreeNode` or `undefined`.
     */
    getChild(direction: -1 | 1): BinarySearchTreeNode<T> | undefined;
    /**
     * Sets the current node's child in the given direction.
     *
     * @param direction - `-1` (left) / `1` (right).
     * @param newNode - The new Child.
     */
    setChild(direction: -1 | 1, newNode: BinarySearchTreeNode<T>): void;
}
/**
 * A Binary Search Tree implementation that accepts any kind of data,
 * including arrays or plain objects. To do so, it must be provided
 * a custom `compareFunction` that will be used to determine the position
 * of the elements instead of the default comparison operators.
 */
declare class BinarySearchTree<T> implements Comparer<T> {
    private _root?;
    /**
     * The function used to compare two elements.
     * It is determinant for the tree structure.
     * By default, it compares numbers so it must be replaced with a custom
     * function when storing another data type.
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
    private traverseMethods;
    /**
     * The traverse method used when unspecified in the concerned methods.
     * It can be changed via `setDefaultTraverseMethod` method.
     * Possible values:
     * - `TraverseMethod.BFS` / `0` (Breadth First Search)
     * - `TraverseMethod.DFSPreOrder` / `1` (Depth First Search Pre Order)
     * - `TraverseMethod.DFSInOrder` / `2` (Depth First Search In Order)
     * - `TraverseMethod.DFSPostOrder` / `3` (Depth First Search Post Order)
     *
     * @defaultValue {@link TraverseMethod | TraverseMethod.DFSPreOrder}
     */
    defaultTraverseMethod: TraverseMethod;
    /**
     * Constructor takes an optional parameter `compareFunction` to replace
     * the default comparison function.
     *
     * @param compareFunction - The function used to compare two values.
     */
    constructor(compareFunction?: CompareFunction<T>);
    /**
     * Returns the root node.
     *
     * @returns The root node
     */
    root(): BinarySearchTreeNode<T> | undefined;
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
    setCompareFunction(compareFunction: CompareFunction<T>): BinarySearchTree<T>;
    /**
     * Sets a default traverse method that will be used when not specified
     * in methods that require traversal.
     * Possible values:
     * - `TraverseMethod.BFS` / `0` (Breadth First Search)
     * - `TraverseMethod.DFSPreOrder` / `1` (Depth First Search Pre Order)
     * - `TraverseMethod.DFSInOrder` / `2` (Depth First Search In Order)
     * - `TraverseMethod.DFSPostOrder` / `3` (Depth First Search Post Order)
     *
     * @param traverseMethod - The default traverse method to use.
     */
    setDefaultTraverseMethod(traverseMethod: TraverseMethod): void;
    /**
     * Inserts a new value to the tree.
     * Note: the structure does not accept duplicates.
     *
     * @param value - The value to insert
     * @returns `true` if succeeded, `false`otherwise
     */
    insert(value: T): boolean;
    /**
     * Resets the tree, removing its elements.
     */
    clear(): void;
    /**
     * Returns an array of the stored values. The order depends on the
     * `TraverseMethod` used.
     *
     * @param traverseMethod - The `TraverseMethod` to use.
     */
    toArray(traverseMethod?: TraverseMethod): T[];
    /**
     * Traverses the tree, applying a transformation to every value according
     * to the given `MapFunction`. A new tree is returned, the current one is
     * unaltered.
     *
     * @param mapFunction - The function describing the transformation to apply
     * on each value.
     * @param traverseMethod - The `TraverseMethod` to use.
     * @param newCompareFunction - The compare function of the new tree.
     * Default is set to the compare function of the current tree.
     * It is **necessary** if the map function changes the values data type.
     * @returns The resulting tree.
     */
    map<U>(mapFunction: MapFunction<T, U>, traverseMethod?: TraverseMethod, newCompareFunction?: CompareFunction<U>): BinarySearchTree<U>;
    /**
     * Creates a new tree with the filtered values of the current one,
     * using the input `filterFunction`. Current tree is unaltered.
     *
     * @param filterFunction - The `FilterFunction` to use.
     * @param traverseMethod - The `TraverseMethod` to use.
     * @returns The resulting tree.
     */
    filter(filterFunction: FilterFunction<T>, traverseMethod?: TraverseMethod): BinarySearchTree<T>;
    /**
     * Computes and return a single value from the values of the tree,
     * using the input `ReduceFunction`.
     *
     * @param reduceFunction - The `ReduceFunction` to use.
     * @param initialValue - The initial value of the accumulator
     * @param traverseMethod - The `TraverseMethod` to use.
     * @returns The accumulated value at the end of traversal.
     */
    reduce<U>(reduceFunction: ReduceFunction<T, U>, initialValue: U, traverseMethod?: TraverseMethod): U;
    /**
     * Traverses the tree using Breadth First Search method,
     * starting from the given root. The given callback is executed
     * on each value.
     *
     * @param root - The traversal starting point
     * @param callback - A callback to execute on each value.
     */
    private traverseBFS;
    /**
     * Traverses the tree recursively using Depth First Search method,
     * and executes a callback on each value.
     * This method gathers all DFS order methods into one, applying the callback
     * at the right moment depending on `order` parameter.
     *
     * @param order - The `TraverseMethod` to use, `TraverseMethod.BFS` excluded.
     * @param currentNode - The element being traversed.
     * @param callback - The callback to execute on each value.
     */
    private traverseDFS;
    /**
     * Traverses the tree using DFS PreOrder method and applies a callback
     * on each value.
     * @param root - The starting point of the traversal.
     * @param callback - The callback to execute on each value.
     */
    private traversePreOrder;
    /**
     * Traverses the tree using DFS InOrder method and applies a callback
     * on each value.
     * @param root - The starting point of the traversal.
     * @param callback - The callback to execute on each value.
     */
    private traverseInOrder;
    /**
     * Traverses the tree using DFS PostOrder method and applies a callback
     * on each value.
     * @param root - The starting point of the traversal.
     * @param callback - The callback to execute on each value.
     */
    private traversePostOrder;
}
export { BinarySearchTree, TraverseMethod, };
