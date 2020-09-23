/**
 * A function that compares two elements a and b of the same type.
 * It can be applied to any data type, including arrays or objects.
 * It should return `-1` if a considered inferior to b, `1` if superior,
 * and `zero` if considered equals.
 */
type CompareFunction<T> = (a: T, b: T) => -1 | 0 | 1

/**
 * A callback function used in a structure traversal. It takes the current
 * value as input and returns a boolean describing whether or not the value
 * should be present in the filtered structure.
 */
type FilterFunction<T> =
    (currentValue: T) => boolean

/**
 * A callback function used in a structure traversal. It takes the current
 * value as input and returns a new value that will replace the current
 * one in the mapped structure.
 */
type MapFunction<T, U> =
    (currentValue: T) => U

/**
 * A callback function used in a structure traversal. It takes an accumulator
 * and the current value as input and returns a value that will be the
 * accumulator for the next value. The final result will be the last
 * accumulator value at the end of traversaL.
 */
type ReduceFunction<T, U> =
    (accumulator: U, currentValue: T) => U

/**
 * A function called on each value encountered during a tree traversal.
 */
type TraverseCallback<T> = (currentValue: T) => any

/**
 * Methods of traversal of a tree or graph. Used in structures methods
 * that require traversal when the order matters.
 * Usage example:
 *  myTree.toArray(TraverseMethod.DFSPreOrder) -> [0, -10, 10]
 *  myTree.toArray(TraverseMethod.DFSInOrder) -> [-10, 0, 10]
 */
enum TraverseMethod {
    BFS,
    DFSPreOrder,
    DFSInOrder,
    DFSPostOrder,
}

export type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
}

export {
    TraverseMethod,
}
