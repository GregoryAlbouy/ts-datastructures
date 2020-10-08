import { Stack } from '.'

describe('Stack', () => {
    it('push', function() {
        const stack = new Stack()

        let value = stack.push('one')

        expect(value).toEqual(1)
        expect(stack.length).toEqual(1)
        expect(stack.pike()!.value).toEqual('one')

        value = stack.push('two')

        expect(value).toEqual(2)
        expect(stack.length).toEqual(2)
        expect(stack.pike()!.value).toEqual('two')
        expect(stack.pike()!.next!.value).toEqual('one')
    })

    it('pop', function() {
        const stack = new Stack()
        stack.push('one')
        stack.push('two')

        let value = stack.pop()

        expect(value).toEqual('two')
        expect(stack.length).toEqual(1)
        expect(stack.pike()!.value).toEqual('one')
        expect(stack.pike()!.next).toBeUndefined()

        value = stack.pop()

        expect(value).toEqual('one')
        expect(stack.length).toEqual(0)
        expect(stack.pike()).toBeUndefined()

        value = stack.pop()

        expect(value).toBeUndefined()
        expect(stack.length).toEqual(0)
        expect(stack.pike()).toBeUndefined()
    })

    it('overflow', function() {
        const stack = new Stack(2)
        stack.push('one')
        stack.push('two')

        const value = stack.push('null')

        expect(value).toEqual(-1)
        expect(stack.capacity).toEqual(2)
        expect(stack.length).toEqual(2)
        expect(stack.pike()!.value).toEqual('two')
    })
})
