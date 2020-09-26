import type {
    BinaryHeap,
} from '../src'

expect.extend({
    toBeValidHeap,
})

function toBeValidHeap(heap: BinaryHeap<any>) {
    const isValidHeap = (() => {
        const values = heap.toArray()
        const n = values.length

        if (n === 0) return true

        for (let i = 0; 2 * i + 1 < n; i++) {
            const v = values[i]
            const iChild = 2 * i + 1

            if (iChild >= n) break
            if (heap.sup(values[iChild], v)) return false
        }

        return true
    })()

    const [pass, message] = isValidHeap
        ? [true, () => `heap is valid: ${heap.toArray()}`]
        : [false, () => `heap is invalid: ${heap.toArray()}`]

    return { pass, message }
}
