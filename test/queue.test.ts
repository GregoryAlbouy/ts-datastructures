import { Queue } from '../src'

describe('Queue', () => {
    it('enqueue', function() {
        const queue = new Queue()

        let value = queue.enqueue('one')

        expect(value).toEqual(1)
        expect(queue.length).toEqual(1)
        expect(queue.first()).toBeDefined()
        expect(queue.last()).toBeDefined()
        expect(queue.first()).toStrictEqual(queue.last())

        queue.enqueue('two')
        value = queue.enqueue('three')

        expect(value).toEqual(3)
        expect(queue.length).toEqual(3)
        expect(queue.first()!.next!.value).toEqual('two')
        expect(queue.first()).not.toStrictEqual(queue.last())
    })

    it('dequeue', function() {
        const queue = new Queue()
        queue.enqueue('one')
        queue.enqueue('two')

        let value = queue.dequeue()

        expect(value).toEqual(1)
        expect(queue.length).toEqual(1)
        expect(queue.first()!.value).toEqual('two')
        expect(queue.first()).toStrictEqual(queue.last())

        value = queue.dequeue()

        expect(value).toEqual(0)
        expect(queue.length).toEqual(0)
        expect(queue.first()).toBeUndefined()
        expect(queue.last()).toBeUndefined()
    })

    it('overflow', function() {
        const queue = new Queue(2)
        queue.enqueue('one')
        queue.enqueue('two')

        const value = queue.enqueue('null')

        expect(value).toEqual(-1)
        expect(queue.capacity).toEqual(2)
        expect(queue.length).toEqual(2)
        expect(queue.last()!.value).toEqual('two')
    })
})
