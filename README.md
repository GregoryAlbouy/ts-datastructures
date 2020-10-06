# TypeScript Datastructures

[![Build Status](https://img.shields.io/travis/gregoryalbouy/ts-datastructures/master)](https://travis-ci.org/GregoryAlbouy/ts-datastructures)
[![codecov](https://img.shields.io/codecov/c/github/gregoryalbouy/ts-datastructures)](https://codecov.io/gh/GregoryAlbouy/ts-datastructures/branch/master)
[![NPM version](https://img.shields.io/npm/v/ts-structures)](https://www.npmjs.org/package/ts-structures)
[![NPM downloads](https://img.shields.io/npm/dt/ts-structures)](https://www.npmjs.org/package/ts-structures)

Implementation of common data structures, TypeScript pendant of my [go-datastructures repo](https://github.com/gregoryalbouy/go-datastructures).
(As a huge Go enthusiast, I must admit that working with a language that support Generics is quite a relief for this kind of work)

## About

The package provides ready-to-use and functionnal data structures. It includes linked lists, queues, stack, binary heaps and I intent to implement a lot more.

This project is also a pretext for the student developer I am to learn and practice many aspects of the development process:

  - :dna: &nbsp;Understanding data structures
  - :vertical_traffic_light: &nbsp;Keeping clean code and good coding practices
  - :white_check_mark: &nbsp;Making relevant tests with high coverage rate
  - :arrows_counterclockwise: &nbsp;Using Continuous Integration tools
  - :blue_book: &nbsp;Maintaining a fully documented codebase

Feedback of any kind is always appreciated!

## Usage

```console
npm i ts-structures
```

```typescript
const { BinarySearchTree } = require('ts-structures')

const tree = new BinarySearchTree()
// ...
```

## Documentation

:point_right: [TypeDoc](https://gregoryalbouy-ts-datastructures.netlify.app)

## Implemented

  - [Doubly Linked List](https://gregoryalbouy-ts-datastructures.netlify.app/classes/_list_doubly_linked_list_.doublylinkedlist.html)
  - [Queue](https://gregoryalbouy-ts-datastructures.netlify.app/classes/_queue_queue_.queue.html)
  - [Priority Queue](https://gregoryalbouy-ts-datastructures.netlify.app/classes/_queue_priority_queue_.priorityqueue.html)
  - [Stack](https://gregoryalbouy-ts-datastructures.netlify.app/classes/_stack_stack_.stack.html)
  - [Binary Search Tree](https://gregoryalbouy-ts-datastructures.netlify.app/classes/_tree_binary_search_tree_.binarysearchtree.html)
  - [Binary Heap](https://gregoryalbouy-ts-datastructures.netlify.app/classes/_heap_binary_heap_.binaryheap.html)
  - [Graph](https://gregoryalbouy-ts-datastructures.netlify.app/interfaces/_graph_index_.graph.html)
    - [List Graph](https://gregoryalbouy-ts-datastructures.netlify.app/classes/_graph_list_graph_.listgraph.html) (Adjacency list based graph, optionnally directed or weighted)
    - Matrix Graph (Adjacency matrix based graph): *in progress*

## Todo

  - Graph implementation
    - Refacto *in progress*
    - MatrixGraph
  - More data structures