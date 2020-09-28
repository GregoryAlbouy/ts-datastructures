"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraverseMethod = exports.BinarySearchTree = void 0;
const _shared_1 = require("../_shared");
Object.defineProperty(exports, "TraverseMethod", { enumerable: true, get: function () { return _shared_1.TraverseMethod; } });
const queue_1 = require("../queue");
/**
 * Represents a single element of a tree. Carrying a given value,
 * it is linked to maximum two child nodes via `left` and `right`
 * fields.
 */
class BinarySearchTreeNode {
    constructor(value) {
        this.value = value;
    }
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
    hasChild(direction) {
        return !!this.getChild(direction);
    }
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
    getChild(direction) {
        return direction === -1 ? this.left : this.right;
    }
    /**
     * Sets the current node's child in the given direction.
     *
     * @param direction - `-1` (left) / `1` (right).
     * @param newNode - The new Child.
     */
    setChild(direction, newNode) {
        direction === -1 ? this.left = newNode : this.right = newNode;
    }
}
/**
 * A Binary Search Tree implementation that accepts any kind of data,
 * including arrays or plain objects. To do so, it must be provided
 * a custom `compareFunction` that will be used to determine the position
 * of the elements instead of the default comparison operators.
 */
class BinarySearchTree {
    /**
     * Constructor takes an optional parameter `compareFunction` to replace
     * the default comparison function.
     *
     * @param compareFunction - The function used to compare two values.
     */
    constructor(compareFunction) {
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
        this.compare = _shared_1.compareMethods.compare.bind(this);
        this.inf = _shared_1.compareMethods.inf.bind(this);
        this.sup = _shared_1.compareMethods.sup.bind(this);
        this.equal = _shared_1.compareMethods.equal.bind(this);
        this.infOrEqual = _shared_1.compareMethods.infOrEqual.bind(this);
        this.supOrEqual = _shared_1.compareMethods.supOrEqual.bind(this);
        this.traverseMethods = [
            this.traverseBFS.bind(this),
            this.traversePreOrder.bind(this),
            this.traverseInOrder.bind(this),
            this.traversePostOrder.bind(this),
        ];
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
        this.defaultTraverseMethod = _shared_1.TraverseMethod.DFSPreOrder;
        if (compareFunction)
            this.compare = compareFunction;
    }
    /**
     * Returns the root node.
     *
     * @returns The root node
     */
    root() {
        return this._root;
    }
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
    setCompareFunction(compareFunction) {
        this.compare = compareFunction;
        // rebuild tree according to the new compare function
        const values = this.toArray(_shared_1.TraverseMethod.DFSPreOrder);
        this.clear();
        values.forEach(this.insert.bind(this));
        return this;
    }
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
    setDefaultTraverseMethod(traverseMethod) {
        this.defaultTraverseMethod = traverseMethod;
    }
    /**
     * Inserts a new value to the tree.
     * Note: the structure does not accept duplicates.
     *
     * @param value - The value to insert
     * @returns `true` if succeeded, `false`otherwise
     */
    insert(value) {
        const newNode = new BinarySearchTreeNode(value);
        if (!this._root) {
            this._root = newNode;
            return true;
        }
        for (let currentNode = this._root; currentNode;) {
            const direction = this.compare(value, currentNode.value);
            if (direction === 0)
                break;
            if (!currentNode.hasChild(direction)) {
                currentNode.setChild(direction, newNode);
                return true;
            }
            currentNode = currentNode.getChild(direction);
        }
        return false;
    }
    /**
     * Resets the tree, removing its elements.
     */
    clear() {
        this._root = undefined;
    }
    /**
     * Returns an array of the stored values. The order depends on the
     * `TraverseMethod` used.
     *
     * @param traverseMethod - The `TraverseMethod` to use.
     */
    toArray(traverseMethod = this.defaultTraverseMethod) {
        const reduceFunction = (values, value) => {
            values.push(value);
            return values;
        };
        const initialValue = [];
        return this.reduce(reduceFunction, initialValue, traverseMethod);
    }
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
    map(mapFunction, traverseMethod = this.defaultTraverseMethod, newCompareFunction) {
        const newTree = new BinarySearchTree(newCompareFunction);
        if (!this._root)
            return newTree;
        const traverse = this.traverseMethods[traverseMethod];
        const callback = (value) => newTree.insert(mapFunction(value));
        traverse(this._root, callback);
        return newTree;
    }
    /**
     * Creates a new tree with the filtered values of the current one,
     * using the input `filterFunction`. Current tree is unaltered.
     *
     * @param filterFunction - The `FilterFunction` to use.
     * @param traverseMethod - The `TraverseMethod` to use.
     * @returns The resulting tree.
     */
    filter(filterFunction, traverseMethod = this.defaultTraverseMethod) {
        const newTree = new BinarySearchTree(this.compare);
        if (!this._root)
            return newTree;
        const traverse = this.traverseMethods[traverseMethod];
        const callback = (value) => {
            if (filterFunction(value))
                newTree.insert(value);
        };
        traverse(this._root, callback);
        return newTree;
    }
    /**
     * Computes and return a single value from the values of the tree,
     * using the input `ReduceFunction`.
     *
     * @param reduceFunction - The `ReduceFunction` to use.
     * @param initialValue - The initial value of the accumulator
     * @param traverseMethod - The `TraverseMethod` to use.
     * @returns The accumulated value at the end of traversal.
     */
    reduce(reduceFunction, initialValue, traverseMethod = this.defaultTraverseMethod) {
        if (!this._root)
            return initialValue;
        let accumulator = initialValue;
        const callback = (value) => {
            accumulator = reduceFunction(accumulator, value);
        };
        const traverse = this.traverseMethods[traverseMethod];
        traverse(this._root, callback);
        return accumulator;
    }
    /**
     * Traverses the tree using Breadth First Search method,
     * starting from the given root. The given callback is executed
     * on each value.
     *
     * @param root - The traversal starting point
     * @param callback - A callback to execute on each value.
     */
    traverseBFS(root, callback) {
        if (!root)
            return;
        const queue = new queue_1.Queue();
        queue.enqueue(root);
        while (queue.first()) {
            const currentTreeNode = queue.dequeue(), left = currentTreeNode.left, right = currentTreeNode.right, value = currentTreeNode.value;
            if (left)
                queue.enqueue(left);
            if (right)
                queue.enqueue(right);
            callback(value);
        }
    }
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
    traverseDFS(order, currentNode, callback) {
        if (order === _shared_1.TraverseMethod.DFSPreOrder)
            callback(currentNode.value);
        if (currentNode.left)
            this.traverseDFS(order, currentNode.left, callback);
        if (order === _shared_1.TraverseMethod.DFSInOrder)
            callback(currentNode.value);
        if (currentNode.right)
            this.traverseDFS(order, currentNode.right, callback);
        if (order === _shared_1.TraverseMethod.DFSPostOrder)
            callback(currentNode.value);
    }
    /**
     * Traverses the tree using DFS PreOrder method and applies a callback
     * on each value.
     * @param root - The starting point of the traversal.
     * @param callback - The callback to execute on each value.
     */
    traversePreOrder(root, callback) {
        this.traverseDFS(_shared_1.TraverseMethod.DFSPreOrder, root, callback);
    }
    /**
     * Traverses the tree using DFS InOrder method and applies a callback
     * on each value.
     * @param root - The starting point of the traversal.
     * @param callback - The callback to execute on each value.
     */
    traverseInOrder(root, callback) {
        this.traverseDFS(_shared_1.TraverseMethod.DFSInOrder, root, callback);
    }
    /**
     * Traverses the tree using DFS PostOrder method and applies a callback
     * on each value.
     * @param root - The starting point of the traversal.
     * @param callback - The callback to execute on each value.
     */
    traversePostOrder(root, callback) {
        this.traverseDFS(_shared_1.TraverseMethod.DFSPostOrder, root, callback);
    }
}
exports.BinarySearchTree = BinarySearchTree;
