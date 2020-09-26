import type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
} from './_shared'

import { TraverseMethod } from './_shared'
import { DoublyLinkedList } from './list'
import { Queue } from './queue'
import { Stack } from './stack'
import { BinarySearchTree } from './tree'
import { BinaryHeap } from './heap'

export type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
}

export {
    DoublyLinkedList,
    Queue,
    Stack,
    BinarySearchTree,
    TraverseMethod,
    BinaryHeap,
}
