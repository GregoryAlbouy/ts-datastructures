import {
    CappedStructure,
    guardOverflow,
} from '../src/_shared'

describe('guardOverflow', function() {
    it('should do nothing', function() {
        const uncapped = new CappableStructure()
        const capped = new CappableStructure({ cap: 2 })

        expect(uncapped.addOrThrowError()).toEqual(true)
        expect(uncapped.addOrReturn42()).toEqual(true)

        expect(capped.addOrThrowError()).toEqual(true)
        expect(capped.addOrReturn42()).toEqual(true)

        // length has reached the max capacity
        expect(capped.addOrThrowError).toThrowError()
        expect(capped.addOrReturn42()).toEqual(42)
    })
})

class CappableStructure implements CappedStructure {
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
