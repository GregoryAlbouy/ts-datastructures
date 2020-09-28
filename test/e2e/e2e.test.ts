import { PriorityQueue } from '../../lib'
const { BinaryHeap } = require('../../lib')

describe('e2e', function() {
    it('should use es6 modules', function() {
        expect(() => new PriorityQueue<string>(2)).not.toThrowError()
    })

    it('should use commonjs', function() {
        expect(() => new BinaryHeap()).not.toThrowError()
    })
})
