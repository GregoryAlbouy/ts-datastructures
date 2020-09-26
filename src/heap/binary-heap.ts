import type {
    Comparer,
    CompareFunction,
} from '../_shared'

import {
    compareMethods,
} from '../_shared'

/**
 * Implementation of a Binary Heap that behaves like a max binary heap
 * with numeric values by default. Nevertheless, it can be provided
 * a custom `CompareFunction` to store any type of data, or to
 * use it as a min binary heap for instance.
 */
class BinaryHeap<T> implements Comparer<T> {
    private values: T[] = []

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
    compare: CompareFunction<T> = compareMethods.compare.bind(this)
    inf = compareMethods.inf.bind(this)
    sup = compareMethods.sup.bind(this)
    equal = compareMethods.equal.bind(this)
    infOrEqual = compareMethods.infOrEqual.bind(this)
    supOrEqual = compareMethods.supOrEqual.bind(this)

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
    public setCompareFunction(compareFunction: CompareFunction<T>): BinaryHeap<T> {
        this.compare = compareFunction

        // rebuild heap according to the new compare function
        const values = this.toArray()
        this.clear()
        this.insert(...values)
        return this
    }

    get length(): number {
        return this.values.length
    }

    public toArray(): T[] {
        return this.values
    }

    public insert(...values: T[]) {
        values.forEach((value) => {
            this.values.push(value)
            this.bubbleUp()
        })
    }

    public shift() {
        const first = this.values[0]
        if (first === undefined) return undefined

        const last = this.values.pop()!
        if (this.length === 0) return first

        this.values[0] = last
        this.bubbleDown()
        return first
    }

    public clear() {
        this.values = []
    }

    private bubbleUp() {
        let currentIndex = this.values.length - 1

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2)

            if (this.infOrEqual(this.values[currentIndex], this.values[parentIndex])) break

            this.swap(currentIndex, parentIndex)
            currentIndex = parentIndex
        }
    }

    private bubbleDown() {
        const maxValueIndex = (...indexes: number[]) => {
            let iMax = indexes[0]
            indexes.forEach((i) => {
                if (this.sup(this.values[i], this.values[iMax])) iMax = i
            })
            return iMax
        }
        let i = 0

        while (i < this.values.length) {
            const iLchild = 2 * i + 1
            const iRchild = iLchild + 1
            const iMax = (() => {
                if (!this.hasIndex(iLchild)) return i
                if (!this.hasIndex(iRchild)) return maxValueIndex(i, iRchild)
                return maxValueIndex(i, iLchild, iRchild)
            })()
            const next = i === iMax ? 0 : iMax

            if (!next) break

            this.swap(i, next)
            i = next
        }
    }

    private swap(i: number, j: number) {
        [this.values[i], this.values[j]] = [this.values[j], this.values[i]]
    }

    private hasIndex(i: number) {
        return i < this.values.length
    }
}

export default BinaryHeap
