import { PriorityQueue } from '.'

describe('priority queue', () => {
    it('enqueue', function() {
        const queue = new PriorityQueue<string>()
        const filledQueue = newTestPriorityQueue()
        const len0 = queue.length
        const value = queue.enqueue('value', 20)
        const len1 = queue.length

        expect(len0).toEqual(0)
        expect(len1).toEqual(1)
        expect(value).toEqual({ value: 'value', priority: 20 })
        expect(queue.values).toBeValidHeap()

        expect(filledQueue.length).toEqual(7)
        expect(filledQueue.values).toBeValidHeap()
    })

    it('dequeue', function() {
        const queue = newTestPriorityQueue()
        const thirty = (() => {
            for (let i = 0; i < 6; i++) queue.dequeue()
            return queue.dequeue()
        })()
        const len0 = queue.length
        const undef = queue.dequeue()

        expect(thirty).toEqual({ value: 'thirty', priority: 30 })
        expect(undef).toBeUndefined()
        expect(len0).toEqual(0)
        expect(queue.length).toEqual(0)
    })

    it('FIFO', function() {
        // Two values with same priority: should
        // 1/ not cause any insertion trouble
        // 2/ respect FIFO principle
        const queue = newTestPriorityQueue()
        const lastIn = queue.enqueue('after', 20)
        const len8 = queue.length
        const heap = queue.values
        const firstOut = (() => {
            for (let i = 0, n = queue.length; i < n; i++) {
                const removed = queue.dequeue()
                if (removed!.priority === 20)
                    return removed
            }
        })()

        expect(lastIn).toEqual({ value: 'after', priority: 20 })
        expect(len8).toEqual(8)
        expect(heap).toBeValidHeap()
        expect(firstOut).not.toEqual(lastIn)
    })

    it('overflow', function() {
        const queue = new PriorityQueue<string>(2)
        queue.enqueue('irrelevant', 10)
        queue.enqueue('irrelevant', 5)

        const undef = queue.enqueue('undef', 0)

        expect(undef).toBeUndefined()
        expect(queue.length).toEqual(2)
    })
})

function newTestPriorityQueue() {
    const queue = new PriorityQueue<string>()
    queue.enqueue('zero', 0)
    queue.enqueue('-thirty', -30)
    queue.enqueue('thirty', 30)
    queue.enqueue('-twenty', -20)
    queue.enqueue('twenty', 20)
    queue.enqueue('-ten', -10)
    queue.enqueue('ten', 10)
    return queue
}
