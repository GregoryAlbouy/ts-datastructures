import { compareMethods } from '.'

describe('compare methods', function() {
    const testObject = {
        compare: compareMethods.compare,
    }

    it('inf', function() {
        const inf = compareMethods.inf.bind(testObject)

        expect(inf(0, 1)).toEqual(true)
        expect(inf(0, 0)).toEqual(false)
        expect(inf(1, 0)).toEqual(false)
    })

    it('sup', function() {
        const sup = compareMethods.sup.bind(testObject)

        expect(sup(0, 1)).toEqual(false)
        expect(sup(0, 0)).toEqual(false)
        expect(sup(1, 0)).toEqual(true)
    })

    it('equal', function() {
        const equal = compareMethods.equal.bind(testObject)

        expect(equal(0, 1)).toEqual(false)
        expect(equal(0, 0)).toEqual(true)
        expect(equal(1, 0)).toEqual(false)
    })

    it('infOrEqual', function() {
        const infOrEqual = compareMethods.infOrEqual.bind(testObject)

        expect(infOrEqual(0, 1)).toEqual(true)
        expect(infOrEqual(0, 0)).toEqual(true)
        expect(infOrEqual(1, 0)).toEqual(false)
    })

    it('supOrEqual', function() {
        const supOrEqual = compareMethods.supOrEqual.bind(testObject)

        expect(supOrEqual(0, 1)).toEqual(false)
        expect(supOrEqual(0, 0)).toEqual(true)
        expect(supOrEqual(1, 0)).toEqual(true)
    })
})
