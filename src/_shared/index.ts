import type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
} from './types'

import {
    TraverseMethod,
} from './types'

import CappedStructure, {
    guardOverflow,
} from './capped-structure'

export type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
}

export {
    CappedStructure,
    guardOverflow,
    TraverseMethod,
}
