import {
    // List,
    DoublyLinkedList,
} from '../src'

describe('doubly linked list', () => {
    it('push', function() {
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

    it('pop', function() {
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

    it('unshift', function() {
        const list = newTestList('one', 'two')
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

    it('shift', function() {
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

    it('insertBefore insertAfter', function() {
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

        // Edge case: insert before/after an element from another list

        const strangerList = new DoublyLinkedList()
        const stranger = strangerList.push('stranger')
        const
            undef0 = list.insertBefore('stranger0', stranger),
            undef1 = list.insertAfter('stranger1', stranger)

        expect(undef0).toBeUndefined()
        expect(undef1).toBeUndefined()
    })

    it('getters', function() {
        const list = newTestList(10, 10, 5, -5, -10, 10)

        expect(list.has(-5)).toEqual(true)
        expect(list.has(42)).toEqual(false)

        expect(list.get(5)!.next!.value).toEqual(-5)
        expect(list.get(42)).toBeFalsy()

        expect(list.getAll(10).length).toEqual(3)
        expect(list.getAll(10)[2].prev!.value).toEqual(-10)
        expect(list.getAll(42)).toStrictEqual([])
    })

    it('toArray', function() {
        const input = [[1, 2], [3, 4], [5, 6]]
        const list = newTestList(...input)
        const arr = list.toArray()

        expect(arr.length).toEqual(3)
        expect(arr).toStrictEqual(input)
    })

    it('map', function() {
        const input = [1, 2, 3]
        const list = newTestList(...input)
        const got = list.map((n: number) => 2 * n).toArray()

        expect(got).toStrictEqual([2, 4, 6])
    })

    it('filter', function() {
        const input = [1, 2, 3]
        const list = newTestList(...input)
        const got = list.filter((n: number) => n % 2 === 0).toArray()

        expect(got).toStrictEqual([2])
    })

    it('reduce', function() {
        const input = [1, 2, 3]
        const list = newTestList(...input)
        const got = list.reduce((a: number, c: number) => a * c, list.head!.value)

        expect(got).toEqual(6)
    })
})

function newTestList<T>(...values: T[]): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>()
    values.forEach(value => list.push(value))
    return list
}
