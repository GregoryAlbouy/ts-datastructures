import type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
    TraverseCallback,
} from './_shared'

import { TraverseMethod } from './_shared'
import { DoublyLinkedList } from './list'
import {
    Queue,
    PriorityQueue,
} from './queue'
import { Stack } from './stack'
import { BinarySearchTree } from './tree'
import { BinaryHeap } from './heap'
import { ListGraph } from './graph'

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
    PriorityQueue,
    Stack,
    BinarySearchTree,
    TraverseMethod,
    BinaryHeap,
    ListGraph,
}
