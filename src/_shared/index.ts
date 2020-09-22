import type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
} from './types'

import CappedStructure, {
    guardOverflow,
} from './capped-structure'

export type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
}

export {
    CappedStructure,
    guardOverflow,
}
