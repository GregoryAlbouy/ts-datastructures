import type {
    Comparer,
    CompareFunction,
} from './comparer'

import {
    compareMethods,
} from './comparer'

import type {
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
    Comparer,
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
}

export {
    compareMethods,
    CappedStructure,
    guardOverflow,
    TraverseMethod,
}
