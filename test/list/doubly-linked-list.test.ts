import {
    // List,
    DoublyLinkedList
} from '../../src'

describe('doubly linked list', () => {

    it('should push and return node', function() {
        const list = newTestList('one', 'two')
        const value = list.push('three').value
        const
            head = list.head!,
            tail = list.tail!,
            mid = head.next!,
            mid2 = tail.prev!

        expect(list.length).toEqual(3)

        expect(value).toEqual('three')
        expect(head.value).toEqual('one')
        expect(mid.value).toEqual('two')
        expect(tail.value).toEqual('three')

        expect(head).toBeDefined()
        expect(tail).toBeDefined()

        expect(head.prev).toBeUndefined()
        expect(tail.next).toBeUndefined()

        expect(head.next).toStrictEqual(mid)
        expect(mid).toStrictEqual(mid2)
        expect(mid.prev).toStrictEqual(head)
        expect(mid.next).toStrictEqual(tail)
        expect(tail.prev).toStrictEqual(mid)
    })

    it('should pop and return node', function() {
        const list = newTestList('one', 'two')
        const value = list.pop()?.value

        expect(value).toEqual('two')
        expect(list.length).toEqual(1)
        expect(list.head).toStrictEqual(list.tail)
        expect(list.head!.prev).toBeUndefined()
        expect(list.head!.next).toBeUndefined()

        // remove last value
        list.pop()
        expect(list.length).toEqual(0)
        expect(list.head).toBeUndefined()
        expect(list.tail).toBeUndefined()

        // pop empty list, should not throw and error
        list.pop()
    })

    it('should unshift and return node', function() {
        const list = newTestList("one", "two")
        const value = list.unshift('zero').value
        const
            head = list.head!,
            mid = head.next!

        expect(value).toEqual('zero')
        expect(list.length).toEqual(3)
        expect(head.prev).toBeUndefined()
        expect(mid.prev).toStrictEqual(head)
        expect(mid.value).toEqual('one')
    })

    it('should shift and return node', function() {
        const list = newTestList('one', 'two')
        const value = list.shift()?.value

        expect(value).toEqual('one')
        expect(list.length).toEqual(1)
        expect(list.head).toStrictEqual(list.tail)
        expect(list.head!.prev).toBeUndefined()
        expect(list.head!.next).toBeUndefined()

        // remove last value
        list.shift()
        expect(list.length).toEqual(0)
        expect(list.head).toBeUndefined()
        expect(list.tail).toBeUndefined()

        // shift empty list, should not throw and error
        list.shift()
    })

    it('should insert at given position', function() {
        const list = newTestList()
        const
            p0 = list.push('zero'),
            p3 = list.push('three'),
            p1 = list.insertAfter('one', p0)!,
            p2 = list.insertBefore('two', p3)!

        expect(list.length).toEqual(4)

        expect(p0.next).toStrictEqual(p1)
        expect(p1.next).toStrictEqual(p2)
        expect(p2.next).toStrictEqual(p3)
    
        expect(p1.prev).toStrictEqual(p0)
        expect(p2.prev).toStrictEqual(p1)
        expect(p3.prev).toStrictEqual(p2)
    })

    it('should return array', function() {
        const input = [[1, 2], [3, 4], [5, 6]]
        const list = newTestList(...input)
        const arr = list.toArray()
        
        expect(arr.length).toEqual(3)
        expect(arr).toStrictEqual(input)
    })
})

function newTestList<T>(...values: T[]): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>()
    values.forEach(value => list.push(value))
    return list
}