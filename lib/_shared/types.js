"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraverseMethod = void 0;
/**
 * Methods of traversal of a tree or graph. Used in structures methods
 * that require traversal when the order matters.
 * Usage example:
 *
 *  `myTree.toArray(TraverseMethod.DFSPreOrder)` -\> [0, -10, 10]
 *
 *  `myTree.toArray(TraverseMethod.DFSInOrder)` -\> [-10, 0, 10]
 */
var TraverseMethod;
(function (TraverseMethod) {
    /**
     * Breadth First Search: traverses all values of the same level of depth,
     * from left to right, before moving to the next level.
     */
    TraverseMethod[TraverseMethod["BFS"] = 0] = "BFS";
    /**
     * Depth First Search PreOrder: for each node, traverses the current value
     * first, then its children from left to right.
     */
    TraverseMethod[TraverseMethod["DFSPreOrder"] = 1] = "DFSPreOrder";
    /**
     * Depth First Search InOrder: for each node, traverses the left child
     * first, then the current value and the right child. This results in
     * a traversal in ascending order.
     */
    TraverseMethod[TraverseMethod["DFSInOrder"] = 2] = "DFSInOrder";
    /**
     * Depth First Search PostOrder: for each node, traverses its children first
     * from left to right, then the current value.
     */
    TraverseMethod[TraverseMethod["DFSPostOrder"] = 3] = "DFSPostOrder";
})(TraverseMethod || (TraverseMethod = {}));
exports.TraverseMethod = TraverseMethod;
