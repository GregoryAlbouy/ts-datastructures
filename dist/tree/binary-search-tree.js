import { Queue } from '../queue';
var TraverseMethod;
(function (TraverseMethod) {
    TraverseMethod[TraverseMethod["BFS"] = 0] = "BFS";
    TraverseMethod[TraverseMethod["DFSPreOrder"] = 1] = "DFSPreOrder";
    TraverseMethod[TraverseMethod["DFSInOrder"] = 2] = "DFSInOrder";
    TraverseMethod[TraverseMethod["DFSPostOrder"] = 3] = "DFSPostOrder";
})(TraverseMethod || (TraverseMethod = {}));
class BinarySearchTreeNode {
    constructor(value) {
        this.value = value;
    }
    hasChild(direction) {
        return direction === -1 ? !!this.left : !!this.right;
    }
    getChild(direction) {
        return direction === -1 ? this.left : this.right;
    }
    setChild(direction, newNode) {
        direction === -1 ? this.left = newNode : this.right = newNode;
    }
}
class BinarySearchTree {
    constructor(compareFunction) {
        this.compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
        this.traverseMethods = [
            this.traverseBFS.bind(this),
            this.traversePreOrder.bind(this),
            this.traverseInOrder.bind(this),
            this.traversePostOrder.bind(this),
        ];
        this.defaultTraverseMethod = TraverseMethod.DFSPreOrder;
        if (compareFunction)
            this.compare = compareFunction;
    }
    root() {
        return this._root;
    }
    setCompareFunction(compareFunction) {
        this.compare = compareFunction;
    }
    setDefaultTraverseMethod(traverseMethod) {
        this.defaultTraverseMethod = traverseMethod;
    }
    insert(value) {
        const newNode = new BinarySearchTreeNode(value);
        if (!this._root) {
            this._root = newNode;
            return true;
        }
        for (let currentNode = this._root; currentNode;) {
            const direction = this.compare(value, currentNode.value);
            if (!direction)
                return false;
            if (!currentNode.hasChild(direction)) {
                currentNode.setChild(direction, newNode);
                return true;
            }
            currentNode = currentNode.getChild(direction);
        }
        return false;
    }
    toArray(traverseMethod = this.defaultTraverseMethod) {
        const reduceFunction = (values, value) => {
            values.push(value);
            return values;
        };
        const initialValue = [];
        return this.reduce(reduceFunction, initialValue, traverseMethod);
    }
    map(mapFunction, traverseMethod = this.defaultTraverseMethod, newCompareFunction) {
        const newTree = new BinarySearchTree(newCompareFunction);
        if (!this._root)
            return newTree;
        const traverse = this.traverseMethods[traverseMethod];
        const callback = (value) => newTree.insert(mapFunction(value));
        traverse(this._root, callback);
        return newTree;
    }
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
    traverseBFS(root, callback) {
        if (!root)
            return;
        const queue = new Queue();
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
    traverseDFS(order, currentNode, callback) {
        if (order === TraverseMethod.DFSPreOrder)
            callback(currentNode.value);
        if (currentNode.left)
            this.traverseDFS(order, currentNode.left, callback);
        if (order === TraverseMethod.DFSInOrder)
            callback(currentNode.value);
        if (currentNode.right)
            this.traverseDFS(order, currentNode.right, callback);
        if (order === TraverseMethod.DFSPostOrder)
            callback(currentNode.value);
    }
    traversePreOrder(root, callback) {
        this.traverseDFS(TraverseMethod.DFSPreOrder, root, callback);
    }
    traverseInOrder(root, callback) {
        this.traverseDFS(TraverseMethod.DFSInOrder, root, callback);
    }
    traversePostOrder(root, callback) {
        this.traverseDFS(TraverseMethod.DFSPostOrder, root, callback);
    }
}
export default BinarySearchTree;
export { TraverseMethod };
