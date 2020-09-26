import { BinaryHeap } from '../src'

describe('binary heap', function() {
    it('insert', function() {
        const heap = new BinaryHeap()
        heap.insert(0, -10, -20, -30, 10, 20, 30)

        expect(heap).toBeValidHeap()
        expect(heap.length).toEqual(7)
    })

    it('shift', function() {
        const heap = new BinaryHeap()
        heap.insert(0, -10, -20, -30, 10, 20, 30)

        let value = heap.shift()
        expect(heap).toBeValidHeap()
        expect(value).toEqual(30)
        expect(heap.length).toEqual(6)

        for (let i = 0; i < 6; i++) heap.shift()
        value = heap.shift()
        expect(value).toBeUndefined()
        expect(heap.length).toEqual(0)
    })

    // Test implementation of a MIN binary heap with objects instead of numbers
    it('compareFunction', function() {
        type TestObj = { value: number }
        const compareFunction = (a: TestObj, b: TestObj) => {
            // reverse order
            return a.value > b.value ? -1 : a.value < b.value ? 1 : 0
        }
        const heap = new BinaryHeap<TestObj>()
        const values = [0, -10, -20, -30, 10, 20, 30].map((value) => ({ value }))

        heap.setCompareFunction(compareFunction)
        heap.insert(...values)

        expect(heap).toBeValidHeap()
    })
})
