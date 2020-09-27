import {
    CappedStructure,
    guardOverflow,
} from '../src/_shared'

describe('guardOverflow', function() {
    it('insert values', function() {
        const uncapped = new TestCappableStructure()
        const capped = new TestCappableStructure({ cap: 2 })

        expect(uncapped.addOrThrowError()).toEqual(true)
        expect(uncapped.addOrReturn42()).toEqual(true)
        expect(uncapped.length).toEqual(2)

        expect(capped.addOrThrowError()).toEqual(true)
        expect(capped.addOrReturn42()).toEqual(true)
        expect(capped.length).toEqual(2)
    })

    it('prevent insertion, return specified value', function() {
        const capped = new TestCappableStructure({ cap: 2 })
        capped.length = 2

        expect(capped.addOrReturn42()).toEqual(42)
    })

    it('prevent insertion, throw error', function() {
        const capped = new TestCappableStructure({ cap: 2 })
        capped.length = 2

        expect(() => capped.addOrThrowError()).toThrowError('TestCappableStructure.addOrThrowError: insertion aborted (limit of 2 reached)')
    })
})

class TestCappableStructure implements CappedStructure {
    length = 0
    capacity = -1

    constructor(options?: { cap?: number }) {
        if (!options) return
        this.capacity = options.cap ?? this.capacity
    }

    @guardOverflow(true)
    addOrThrowError() {
        this.length++
        return true
    }

    @guardOverflow(false, 42)
    addOrReturn42() {
        this.length++
        return true
    }
}
