import { BinarySearchTree } from '../src'
import { TraverseMethod } from '../src/tree/binary-search-tree'

describe('binary search tree', function() {
    it('insert', function() {
        const tree = getTestTree()
        const falsy = tree.insert(10)

        expect(tree.root()!.value).toEqual(0)
        expect(tree.root()!.left!.value).toEqual(-10)
        expect(tree.root()!.left!.left!.value).toEqual(-15)
        expect(tree.root()!.left!.right!.value).toEqual(-5)
        expect(tree.root()!.right!.value).toEqual(10)
        expect(tree.root()!.right!.right!.value).toEqual(15)
        expect(tree.root()!.right!.left!.value).toEqual(5)
        expect(falsy).toBeFalsy()
    })

    it('traverse methods', function() {
        const tree = getTestTree()
        const BFS = tree.toArray(TraverseMethod.BFS)
        const DFSPreOrder = tree.toArray(TraverseMethod.DFSPreOrder)
        const DFSInOrder = tree.toArray(TraverseMethod.DFSInOrder)
        const DFSPostOrder = tree.toArray(TraverseMethod.DFSPostOrder)

        expect(BFS).toStrictEqual([0, -10, 10, -15, -5, 5, 15])
        expect(DFSPreOrder).toStrictEqual([0, -10, -15, -5, 10, 5, 15])
        expect(DFSInOrder).toStrictEqual([-15, -10, -5, 0, 5, 10, 15])
        expect(DFSPostOrder).toStrictEqual([-15, -5, -10, 5, 15, 10, 0])
    })

    it('filter', function() {
        const tree = getTestTree()
        const copy = getTestTree()
        const filterFunction = (n: number) => n >= 0
        const newTree = tree.filter(filterFunction)

        expect(newTree.toArray()).toStrictEqual([0, 10, 5, 15])
        expect(tree.toArray()).toStrictEqual(copy.toArray())
    })

    it('map', function() {
        const tree = getTestTree()
        const copy = getTestTree()
        const mapFunction = (n: number) => 2 * n
        const newTree = tree.map(mapFunction)

        expect(newTree.toArray()).toStrictEqual(tree.toArray().map(mapFunction))
        expect(tree.toArray()).toStrictEqual(copy.toArray())
    })

    it('reduce', function() {
        const tree = getTestTree()
        const copy = getTestTree()
        const reduceFunction = (acc: string, n: number) => acc + (2 * n).toString()
        const result = tree.reduce(reduceFunction, 'youpi:')

        expect(result).toStrictEqual(tree.toArray().reduce(reduceFunction, 'youpi:'))
        expect(tree.toArray()).toStrictEqual(copy.toArray())
    })
})

/**
 * Expected tree:
 *          0
 *    -10      10
 * -15  -5    5  15
 */
function getTestTree(): BinarySearchTree<number> {
    const tree = new BinarySearchTree<number>()
    tree.insert(0)
    tree.insert(-10)
    tree.insert(10)
    tree.insert(-15)
    tree.insert(15)
    tree.insert(-5)
    tree.insert(5)
    return tree
}
