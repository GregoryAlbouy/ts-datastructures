import { Queue } from '../queue'
import type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
} from '../_shared/types'

// convenience type alias
type PotentialBSTNode<T> = BinarySearchTreeNode<T> | undefined

type TraverseCallback<T> = (value: T) => any

enum TraverseMethod {
    BFS,
    DFSPreOrder,
    DFSInOrder,
    DFSPostOrder,
}

class BinarySearchTreeNode<T> {
    value: T
    left?: BinarySearchTreeNode<T>
    right?: BinarySearchTreeNode<T>

    constructor(value: T) {
        this.value = value
    }

    hasChild(direction: -1 | 1) {
        return !!this.getChild(direction)
    }

    getChild(direction: -1 | 1) {
        return direction === -1 ? this.left : this.right
    }

    setChild(direction: -1 | 1, newNode: BinarySearchTreeNode<T>) {
        direction === -1 ? this.left = newNode : this.right = newNode
    }
}

class BinarySearchTree<T> {
    private _root?: BinarySearchTreeNode<T>

    private compare: CompareFunction<T> =
        (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0

    private traverseMethods = [
        this.traverseBFS.bind(this), // Ahh JavaScript...!
        this.traversePreOrder.bind(this),
        this.traverseInOrder.bind(this),
        this.traversePostOrder.bind(this),
    ]

    public defaultTraverseMethod = TraverseMethod.DFSPreOrder

    constructor(compareFunction?: CompareFunction<T>) {
        if (compareFunction) this.compare = compareFunction
    }

    public root(): BinarySearchTreeNode<T> | undefined {
        return this._root
    }

    public setCompareFunction(compareFunction: CompareFunction<T>): BinarySearchTree<T> {
        this.compare = compareFunction

        // rebuild tree according to the new compare function
        const values = this.toArray(TraverseMethod.DFSPreOrder)
        this.clear()
        values.forEach(this.insert.bind(this))
        return this
    }

    public setDefaultTraverseMethod(traverseMethod: TraverseMethod) {
        this.defaultTraverseMethod = traverseMethod
    }

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

    public clear() {
        this._root = undefined
    }

    public toArray(traverseMethod: TraverseMethod = this.defaultTraverseMethod): T[] {
        const reduceFunction = (values: T[], value: T) => {
            values.push(value)
            return values
        }
        const initialValue: T[] = []
        return this.reduce(reduceFunction, initialValue, traverseMethod)
    }

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

    private traverseDFS(
        order: TraverseMethod,
        currentNode: BinarySearchTreeNode<T>,
        callback: TraverseCallback<T>,
    ) {
        if (order === TraverseMethod.DFSPreOrder) callback(currentNode.value)
        if (currentNode.left) this.traverseDFS(order, currentNode.left, callback)
        if (order === TraverseMethod.DFSInOrder) callback(currentNode.value)
        if (currentNode.right) this.traverseDFS(order, currentNode.right, callback)
        if (order === TraverseMethod.DFSPostOrder) callback(currentNode.value)
    }

    private traversePreOrder(root: BinarySearchTreeNode<T>, callback: TraverseCallback<T>) {
        this.traverseDFS(TraverseMethod.DFSPreOrder, root, callback)
    }

    private traverseInOrder(root: BinarySearchTreeNode<T>, callback: TraverseCallback<T>) {
        this.traverseDFS(TraverseMethod.DFSInOrder, root, callback)
    }

    private traversePostOrder(root: BinarySearchTreeNode<T>, callback: TraverseCallback<T>) {
        this.traverseDFS(TraverseMethod.DFSPostOrder, root, callback)
    }
}

export default BinarySearchTree

export { TraverseMethod }
