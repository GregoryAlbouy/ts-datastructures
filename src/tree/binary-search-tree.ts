import type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
} from '../_shared/types'
import { TraverseMethod } from '../_shared/types'
import { Queue } from '../queue'

// convenience type alias
type PotentialBSTNode<T> = BinarySearchTreeNode<T> | undefined

/**
 * Represents a single element of a tree. Carrying a given value,
 * it is linked to maximum two child nodes via `left` and `right`
 * fields.
 */
class BinarySearchTreeNode<T> {
    public value: T
    public left?: BinarySearchTreeNode<T>
    public right?: BinarySearchTreeNode<T>

    constructor(value: T) {
        this.value = value
    }

    /**
     * Whether the current node has a child in the given direction.
     *
     * Values `-1` (left) or `1` (right) for the direction input are used
     * for convenience, as it is the direct result of the `CompareFunction`.
     * Case `0` is not treated as it is considered already checked.
     *
     * @param direction `-1` (left) / `1` (right).
     * @returns `true` / `false`.
     */
    public hasChild(direction: -1 | 1) {
        return !!this.getChild(direction)
    }

    /**
     * Returns the current node's child in the given direction
     * (can be `undefined`).
     *
     * Values `-1` (left) or `1` (right) for the direction input are used
     * for convenience, as it is the direct result of the `CompareFunction`.
     * Case `0` is not treated as it is considered already checked.
     *
     * @param direction `-1` (left) / `1` (right).
     * @returns a child `BinarySearchTreeNode` or `undefined`.
     */
    public getChild(direction: -1 | 1) {
        return direction === -1 ? this.left : this.right
    }

    /**
     * Sets the current node's child in the given direction.
     *
     * @param direction `-1` (left) / `1` (right).
     * @param newNode The new Child.
     */
    public setChild(direction: -1 | 1, newNode: BinarySearchTreeNode<T>) {
        direction === -1 ? this.left = newNode : this.right = newNode
    }
}

/**
 * A Binary Search Tree implementation that accepts any kind of data,
 * including arrays or plain objects. To do so, it must be provided
 * a custom `compareFunction` that will be used to determine the position
 * of the elements instead of the default '<', '>', '===' comparison
 * operators.
 */
class BinarySearchTree<T> {
    private _root?: BinarySearchTreeNode<T>

    /**
     * The function used to compare two elements.
     * It is determinant for the tree structure.
     * By default, it compares numbers so it must be replaced with a custom
     * function when storing another data type.
     *
     * @param a Element A
     * @param b Element B
     * @return `-1` if a < b, `1` if a > b, `0` if a === b
     */
    private compare: CompareFunction<T> =
        (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0

    private traverseMethods = [
        this.traverseBFS.bind(this), // Ahh JavaScript...!
        this.traversePreOrder.bind(this),
        this.traverseInOrder.bind(this),
        this.traversePostOrder.bind(this),
    ]

    /**
     * The traverse method used when unspecified in the concerned methods.
     * It can be changed via `setDefaultTraverseMethod` method.
     * Possible values:
     * - `TraverseMethod.BFS` / `0` (Breadth First Search)
     * - `TraverseMethod.DFSPreOrder` / `1` (Depth First Search Pre Order)
     * - `TraverseMethod.DFSInOrder` / `2` (Depth First Search In Order)
     * - `TraverseMethod.DFSPostOrder` / `3` (Depth First Search Post Order)
     *
     * @default`TraverseMethod.DFSPreOrder`
     */
    public defaultTraverseMethod: TraverseMethod = TraverseMethod.DFSPreOrder

    /**
     * Constructor takes an optional parameter `compareFunction` to replace
     * the default comparison function.
     *
     * @param compareFunction The function used to compare two values.
     */
    constructor(compareFunction?: CompareFunction<T>) {
        if (compareFunction) this.compare = compareFunction
    }

    /**
     * Returns the root node.
     *
     * @returns The root node
     */
    public root(): BinarySearchTreeNode<T> | undefined {
        return this._root
    }

    /**
     * Replaces the current compare function with the provided
     * `CompareFunction`. A compare function has the signature:
     * `CompareFunction<T>(a: T, b: T) => -1 | 0 | 1`.
     *
     * To keep its integrity, the tree is fully rebuilt.
     *
     * @param compareFunction The function to use to compare two values.
     * @returns The tree instance.
     */
    public setCompareFunction(compareFunction: CompareFunction<T>): BinarySearchTree<T> {
        this.compare = compareFunction

        // rebuild tree according to the new compare function
        const values = this.toArray(TraverseMethod.DFSPreOrder)
        this.clear()
        values.forEach(this.insert.bind(this))
        return this
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
     * @param traverseMethod The default traverse method to use.
     */
    public setDefaultTraverseMethod(traverseMethod: TraverseMethod) {
        this.defaultTraverseMethod = traverseMethod
    }

    /**
     * Inserts a new value to the tree.
     * Note: the structure does not accept duplicates.
     *
     * @param value The value to insert
     * @returns `true` if succeeded, `false`otherwise
     */
    public insert(value: T): boolean {
        const newNode = new BinarySearchTreeNode(value)

        if (!this._root) {
            this._root = newNode
            return true
        }

        for (let currentNode: PotentialBSTNode<T> = this._root; currentNode;) {
            const direction = this.compare(value, currentNode.value)

            if (direction === 0) break

            if (!currentNode.hasChild(direction)) {
                currentNode.setChild(direction, newNode)
                return true
            }

            currentNode = currentNode.getChild(direction)
        }

        return false
    }

    /**
     * Resets the tree, removing its elements.
     */
    public clear() {
        this._root = undefined
    }

    /**
     * Returns an array of the stored values. The order depends on the
     * `TraverseMethod` used.
     *
     * @param traverseMethod The `TraverseMethod` to use.
     */
    public toArray(traverseMethod: TraverseMethod = this.defaultTraverseMethod): T[] {
        const reduceFunction = (values: T[], value: T) => {
            values.push(value)
            return values
        }
        const initialValue: T[] = []
        return this.reduce(reduceFunction, initialValue, traverseMethod)
    }

    /**
     * Traverses the tree, applying a transformation to every value according
     * to the given `MapFunction`. A new tree is returned, the current one is
     * unaltered.
     *
     * @param mapFunction The function describing the transformation to apply
     * on each value.
     * @param traverseMethod The `TraverseMethod` to use.
     * @param newCompareFunction The compare function of the new tree.
     * Default is set to the compare function of the current tree.
     * It is **necessary** if the map function changes the values data type.
     * @returns The resulting tree.
     */
    public map<U>(
        mapFunction: MapFunction<T, U>,
        traverseMethod: TraverseMethod = this.defaultTraverseMethod,
        newCompareFunction?: CompareFunction<U>,
    ): BinarySearchTree<U> {
        const newTree = new BinarySearchTree<U>(newCompareFunction)
        if (!this._root) return newTree

        const traverse = this.traverseMethods[traverseMethod]
        const callback = (value: T) => newTree.insert(mapFunction(value))

        traverse(this._root!, callback)
        return newTree
    }

    /**
     * Creates a new tree with the filtered values of the current one,
     * using the input `filterFunction`. Current tree is unaltered.
     *
     * @param filterFunction The `FilterFunction` to use.
     * @param traverseMethod The `TraverseMethod` to use.
     * @returns The resulting tree.
     */
    public filter(
        filterFunction: FilterFunction<T>,
        traverseMethod: TraverseMethod = this.defaultTraverseMethod,
    ): BinarySearchTree<T> {
        const newTree = new BinarySearchTree<T>(this.compare)
        if (!this._root) return newTree

        const traverse = this.traverseMethods[traverseMethod]
        const callback = (value: T) => {
            if (filterFunction(value)) newTree.insert(value)
        }

        traverse(this._root!, callback)
        return newTree
    }

    /**
     * Computes and return a single value from the values of the tree,
     * using the input `ReduceFunction`.
     *
     * @param reduceFunction The `ReduceFunction` to use.
     * @param initialValue The initial value of the accumulator
     * @param traverseMethod The `TraverseMethod` to use.
     * @returns The accumulated value at the end of traversal.
     */
    public reduce<U>(
        reduceFunction: ReduceFunction<T, U>,
        initialValue: U,
        traverseMethod: TraverseMethod = this.defaultTraverseMethod,
    ): U {
        if (!this._root) return initialValue

        let accumulator: U = initialValue
        const callback = (value: T) => {
            accumulator = reduceFunction(accumulator, value)
        }
        const traverse = this.traverseMethods[traverseMethod]

        traverse(this._root!, callback)
        return accumulator
    }

    /**
     * Traverses the tree using Breadth First Search method,
     * starting from the given root. The given callback is executed
     * on each value.
     *
     * @param root The traversal starting point
     * @param callback A callback to execute on each value.
     */
    private traverseBFS(root: BinarySearchTreeNode<T>, callback: TraverseCallback<T>) {
        if (!root) return

        const queue = new Queue<BinarySearchTreeNode<T>>()
        queue.enqueue(root)

        while (queue.first()) {
            const
                currentTreeNode = queue.dequeue()!,
                left = currentTreeNode.left,
                right = currentTreeNode.right,
                value = currentTreeNode.value

            if (left) queue.enqueue(left)
            if (right) queue.enqueue(right)
            callback(value)
        }
    }

    /**
     * Traverses the tree recursively using Depth First Search method,
     * and executes a callback on each value.
     * This method gathers all DFS order methods into one, applying the callback
     * at the right moment depending on `order` parameter.
     *
     * @param order The `TraverseMethod` to use, `TraverseMethod.BFS` excluded.
     * @param currentNode The element being traversed.
     * @param callback The callback to execute on each value.
     */
    private traverseDFS(
        order: Exclude<TraverseMethod, TraverseMethod.BFS>,
        currentNode: BinarySearchTreeNode<T>,
        callback: TraverseCallback<T>,
    ) {
        if (order === TraverseMethod.DFSPreOrder) callback(currentNode.value)
        if (currentNode.left) this.traverseDFS(order, currentNode.left, callback)
        if (order === TraverseMethod.DFSInOrder) callback(currentNode.value)
        if (currentNode.right) this.traverseDFS(order, currentNode.right, callback)
        if (order === TraverseMethod.DFSPostOrder) callback(currentNode.value)
    }

    /**
     * Traverses the tree using DFS PreOrder method and applies a callback
     * on each value.
     * @param root The starting point of the traversal.
     * @param callback The callback to execute on each value.
     */
    private traversePreOrder(root: BinarySearchTreeNode<T>, callback: TraverseCallback<T>) {
        this.traverseDFS(TraverseMethod.DFSPreOrder, root, callback)
    }

    /**
     * Traverses the tree using DFS InOrder method and applies a callback
     * on each value.
     * @param root The starting point of the traversal.
     * @param callback The callback to execute on each value.
     */
    private traverseInOrder(root: BinarySearchTreeNode<T>, callback: TraverseCallback<T>) {
        this.traverseDFS(TraverseMethod.DFSInOrder, root, callback)
    }

    /**
     * Traverses the tree using DFS PostOrder method and applies a callback
     * on each value.
     * @param root The starting point of the traversal.
     * @param callback The callback to execute on each value.
     */
    private traversePostOrder(root: BinarySearchTreeNode<T>, callback: TraverseCallback<T>) {
        this.traverseDFS(TraverseMethod.DFSPostOrder, root, callback)
    }
}

export default BinarySearchTree

export { TraverseMethod }
