import type {
    FilterFunction,
    // MapFunction,
    ReduceFunction,
    TraverseCallback,
} from '../_shared/types'
import type {
    Graph,
    GraphOptions,
} from '.'

import {
    PriorityQueue,
    PriorityQueueNode,
    Queue,
} from '../queue'
// import { Stack } from '../stack'

/**
 * Represents a single weight connection from one vertex to another.
 */
class Edge {
    /**
     * The origin vertex.
     */
    from: string

    /**
     * The destination vertex.
     */
    to: string

    /**
     * The weight value.
     */
    weight: number

    /**
     * Creates a new edge connecting two vertices with given weight.
     * 
     * @param from - The origin vertex.
     * @param to - The destination vertex.
     * @param weight - The weight of the edge.
     */
    constructor(from: string, to: string, weight: number) {
        this.from = from
        this.to = to
        this.weight = weight
    }

    /**
     * Sets the edge weight to the current value.
     * 
     * @param weight - The new weight value.
     */
    public setWeight(weight: number) {
        this.weight = weight
    }
}

// TODO:
// - method to retrieve an array of relations at level N
// - method to retrieve an array of direct neighbours (level 1)
/**
 * Represents a node in a graph. It consists of a unique id, an associated data
 * and a collection of edges connecting it to other vertices.
 */
class Vertex<T> {
    /**
     * Unique identifier in a graph scope. It should never be modified.
     */
    public id: string

    /**
     * Data carried by the vertex.
     */
    public data: T

    /**
     * A collection of edges stored in a Map for quick access
     * a insert/remove operations.
     */
    private _edges: Map<string, Edge>

    /**
     * Returns a new `Vertex`with a **unique id** and associated data.
     * 
     * @param id - Unique id in graph scope.
     * @param data - The carried data.
     */
    constructor(id: string, data: T) {
        this.id = id
        this.data = data
        this._edges = new Map()
        this.lock()
    }

    /**
     * Prevents from altering the vertex once create.
     * Might change strategy later?
     */
    private lock() {
        Object.freeze(this)
    }

    get size() {
        return this._edges.size
    }

    /**
     * Returns an array of the vertex edges.
     */
    public edges() {
        return [...this._edges.values()]
    }

    /**
     * Adds a new edge to the collection.
     * 
     * @param edge - The edge to add.
     */
    public addEdge(edge: Edge): boolean {
        if (this._edges.has(edge.to)) return false
        this._edges.set(edge.to, edge)
        return true
    }

    // public setEdgeWeight(to: string, weight: number): boolean {
    //     if (!this._edges.has(to)) return false
    //     this._edges.get(to)?.setWeight(weight)
    //     return true
    // }

    public hasEdge(to: string): boolean {
        return this._edges.has(to)
    }

    public getEdge(to: string): Edge | undefined {
        return this._edges.get(to)
    }

    public removeEdge(to: string): boolean {
        return this._edges.delete(to)
    }

    public forEachEdge(callback: (edge: Edge, to: string) => void) {
        this._edges.forEach((edge, to) => callback(edge, to))
    }
}

/**
 * A Graph implementation based on an Adjacency list.
 * In its current implementation, it is weighted (with a default value
 * of `1`, allowing to not care about it if it is not needed), and
 * can be optionnaly directed if specified in the constructor options.
 */
class ListGraph<T> implements Graph<T> {
    /**
     * The data source containing all vertices and edges, using
     * a Map as adjacency list.
     */
    private data = new Map<string, Vertex<T>>()

    /**
     * Whether edges should be added in both direction.
     * 
     * @defaultValue `false`
     */
    private isDirected = false

    /**
     * Whether the edges should be assigner a weight value.
     * Note: unused for now. A weight can be added no matter
     * this value, and if not a default value is used.
     * 
     * @defaultValue `false`
     */
    private isWeighted = false

    /**
     * The default weight value to add to the edges.
     * 
     * @defaultValue `1`
     */
    private defaultWeight = 1

    constructor(options?: GraphOptions | undefined) {
        if (options) {
            this.isDirected = options.directed ?? this.isDirected
            this.isWeighted = options.weighted ?? this.isWeighted
            this.defaultWeight = options.defaultWeight ?? this.defaultWeight
        }
    }

    /**
     * The number of vertices.
     */
    get order(): number {
        return this.data.size
    }

    /**
     * The number of edges.
     */
    get size(): number {
        const total = this.reduce((sum, vtx) => sum + vtx.size, 0)
        return this.isDirected ? total : total / 2
    }

    /**
     * Sets the default weight on edge insertion to the given value.
     * 
     * @param weight - The replacing weight value .
     */
    public setDefaultWeight(weight: number) {
        this.defaultWeight = weight
    }

    /**
     * Retrieves the vertex corresponding to given id.
     *
     * @param id - The vertex id.
     * @returns - The matching `Vertex` or `undefined` if not found.
     */
    public get(id: string): Vertex<T> | undefined {
        return this.data.get(id)
    }

    /**
     * Retrieves an edge connecting two vertices. The parameters order
     * only matter in the case of a directed graph.
     *
     * @param from - The origin vertex id.
     * @param to - The destination vertex id.
     * @returns - The matching `Edge` or `undefined` if not found.
     */
    public getEdge(from: string, to: string): Edge | undefined {
        return this.get(from)?.getEdge(to)
    }

    /**
     * Returns an array of all vertices.
     *
     * @returns An array of `Vertex`.
     */
    public vertices(): Vertex<T>[] {
        return this.reduce((arr, vertex) => {
            arr.push(vertex)
            return arr
        }, [] as Vertex<T>[])
    }

    // TODO?: in case of undirected graph, return only once each edge?
    /**
     * Returns an array of all edges.
     *
     * @returns An array of `Edge`.
     */
    public edges(): Edge[] {
        return this.reduce((arr, vertex) => {
            arr.push(...vertex.edges())
            return arr
        }, [] as Edge[])
    }

    /**
     * Adds a new vertex, referenced with a **unique** id, holding given data.
     * If the given id is already used, the insertion is aborted.
     *
     * @param id - The vertex ID.  **Must be unique**
     * @param data - Additionnal data.
     * @returns `true` or `false` if it failed to insert.
     */
    public addVertex(id: string, data: T): boolean {
        if (this.data.has(id)) return false
        this.data.set(id, new Vertex(id, data))
        return true
    }

    /**
     * Adds new vertices from given tuples [id, data]
     * 
     * @param vertices - The tuples separated by a comma
     */
    public addVertices(...vertices: [string, T][]) {
        vertices.forEach(([id, data]) => this.addVertex(id, data))
    }

    /**
     * Removes vertex qith given id and its related edges.
     *
     * @param id - id of the vertex to be removed.
     * @returns `true` or `false` if the vertex is not found.
     */
    public removeVertex(id: string): boolean {
        if (!this.data.delete(id)) return false
        this.data.forEach((vertex) => vertex.removeEdge(id))
        return true
    }

    /**
     * Removes all related edges to a vertex. The associated data persists.
     *
     * @param id - id if the vertex to be removed.
     * @returns `true` or `false` if the vertex is not found.
     */
    public resetVertex(id: string): boolean {
        const vertex = this.get(id)
        if (!vertex) return false
        return this.removeVertex(id) && this.addVertex(vertex.id, vertex.data)
    }

    /**
     * Adds an edge between two vertices with an optional weight. The order of
     * `from` and `to` parameters only matters if the graph is directed.
     * It fails if a vertex is not found or when trying to add an already
     * existing edge.
     *
     * @param from - The origin vertex of the edge.
     * @param to - The destination vertex of the edge.
     * @param weight - The edge weight.
     * @returns `true` or `false` if insertion failed.
     */
    public addEdge(from: string, to: string, weight = this.defaultWeight): boolean {
        const {
            srcVertex,
            dstVertex,
            isSafeAdd,
        } = this.checkEdgeOps(from, to)

        if (!isSafeAdd) return false

        const srcAdded = srcVertex?.addEdge(new Edge(from, to, weight))

        return this.isDirected
            ? !!srcAdded
            : !!srcAdded && !!dstVertex?.addEdge(new Edge(to, from, weight))

        // return !!srcAdded && (this.isDirected
        //     ? true
        //     : !!dstVertex?.addEdge(new Edge(to, from, weight)))
    }

    /**
     * Removes the edge between two vertices. The order of `from` and `to`
     * parameters only matters if the graph is directed.
     * It fails if a vertex is not found or when trying to remove an inexistent
     * edge.
     *
     * @param from - The origin vertex of the edge.
     * @param to - The destination vertex of the edge.
     * @returns `true` or `false` if it failed to remove an edge.
     */
    public removeEdge(from: string, to: string): boolean {
        const {
            srcVertex,
            dstVertex,
            isSafeRem,
        } = this.checkEdgeOps(from, to)

        if (!isSafeRem) return false

        const srcRemoved = srcVertex?.removeEdge(to)
        if (this.isDirected) return !!srcRemoved

        const dstRemoved = dstVertex?.removeEdge(from)
        return !!srcRemoved && !!dstRemoved
    }

    /**
     * Retrieves the edge between two vertices and sets its weight.
     * The order of `from` and `to` parameters only matters if the graph
     * is directed.
     * It fails if no edge is found (missing vertex or vertices not
     * connected).
     *
     * @param from - The origin vertex of the edge.
     * @param to - The destination vertex of the edge.
     * @returns `true` or `false` if it failed to retrieve the edge.
     */
    public setEdgeWeight(from: string, to: string, weight: number): boolean {
        const srcEdge = this.getEdge(from, to)
        const dstEdge = this.getEdge(to, from)
        if (!srcEdge || (!this.isDirected && !dstEdge)) return false
        srcEdge.setWeight(weight)
        if (!this.isDirected) dstEdge!.setWeight(weight)
        return true
    }

    /**
     * Retrieves the edge between two vertices and returns its weight.
     * The order of `from` and `to` parameters only matters if the graph
     * is directed.
     * It fails if no edge is found (missing vertex or vertices not
     * connected).
     *
     * @param from - The origin vertex of the edge.
     * @param to - The destination vertex of the edge.
     * @returns The weight value of the edge  or `undefined` if it failed
     * to retrieve the edge.
     */
    public getEdgeWeight(from: string, to: string): number | undefined {
        const edge = this.getEdge(from, to)
        if (!edge) return undefined
        return edge.weight
    }

    /**
     * Internal helper providing recurrent checks on a specific edge
     * before performing an operation.
     * 
     * @param from - The origin vertex of the edge.
     * @param to - The destination vertex of the edge.
     * @returns \{
     * 
     * `srcVertex`: (*Vertex*) Vertex match for `from`
     * 
     * `dstVertex`: (*Vertex*) Vertex match for `to`
     * 
     * `isSafeAdd`: (*boolean*)
     * 
     * `isSafeRem`: (*boolean*)
     * 
     * \}
     */
    private checkEdgeOps(from: string, to: string) {
        const srcVertex = this.get(from)
        const dstVertex = this.get(to)
        const verticesExist = !!srcVertex && !!dstVertex
        const isSafeAdd = verticesExist
            && !srcVertex!.hasEdge(to)
            && (!this.isDirected ? !dstVertex!.hasEdge(from) : true)
        const isSafeRem = verticesExist
            && srcVertex!.hasEdge(to)
            && (!this.isDirected ? dstVertex!.hasEdge(from) : true)

        return { srcVertex, dstVertex, isSafeAdd, isSafeRem }
    }

    /**
     * Executes a callback on each vertex.
     *
     * @param callback - The callback to execute on each vertex.
     */
    public walk(callback: (vertex: Vertex<T>, id: string) => void) {
        this.data.forEach((vertex, id) => callback(vertex, id))
    }

    /**
     * Reduces all vertices to a single value using the ginven `reduce`
     * function.
     * 
     * @param reduce - The `ReduceFunction` to apply on each vertex.
     * @param initialValue - The starting value.
     * @returns The value resulting of the result function.
     */
    public reduce<R>(reduce: ReduceFunction<Vertex<T>, R>, initialValue: R): R {
        let accumulator = initialValue
        this.walk((vertex) => { accumulator = reduce(accumulator, vertex) })
        return accumulator
    }

    // TODO: find a correct way to also restitute distance between
    // each step. That implies not returning a true Vertex<T>[]
    // because of that additionnal info not carried by a Vertex.
    //
    // A linked list seems well suited for the task
    // -> return DoublyLinkedList<Vertex<T>>
    // each DLLNode: { value: { vertex: Vertex<T>, dist: number }, (...) }
    // `dist` would represent the distance from either the previous
    // vertex or from the start.
    //
    // Or an array of tuples [[Vertex<T>, number], [Vertex<T>, number], ...]
    /**
     * Returns an array of `Vertex<T>` representing the steps of
     * the shortest path from position `from` to position `to`.
     * It uses Dijktsra's algorithm.
     * 
     * @param from - The starting vertex id.
     * @param to - The destination vertex id.
     * @param filter - An optional filter function applied on vertices
     * to restrict or not their usage.
     * @returns An array of {@link Vertex | Vertex\<T\>}
     */
    public shortestPath(from: string, to: string, filter?: FilterFunction<Vertex<T>>) {
        const pqueue = new PriorityQueue<string>()
        const distances = new Map<string, number>()
        const previous = new Map<string, string | null>()
        const path: Vertex<T>[] = []

        if (!this.get(from) || !this.get(to)) return path

        // initialize
        this.data.forEach((_, id) => {
            if (id === from) {
                distances.set(id, 0)
                pqueue.enqueue(id, 0)
            } else {
                distances.set(id, Infinity)
                pqueue.enqueue(id, Infinity)
            }
            previous.set(id, null)
        })

        let current: PriorityQueueNode<string> | undefined

        while (current = pqueue.dequeue()) { // eslint-disable-line no-cond-assign
            let smallest = current.value

            // Path calculations over, render the final array
            if (smallest === to) {
                while (previous.get(smallest) !== undefined) { // explicit undefined or 0 would break
                    path.push(this.get(smallest)!)
                    smallest = previous.get(smallest)!
                }

                break
            }

            this.get(smallest)?.forEachEdge(({ to, weight }) => {
                if (filter && !filter(this.get(to)!)) return

                const candidate = distances.get(smallest)! + weight

                if (candidate < distances.get(to)!) {
                    distances.set(to, candidate)
                    previous.set(to, smallest)
                    pqueue.enqueue(to, candidate)
                }
            })
        }

        return path.reverse()
    }

    // CHECKPOINT REFACTO

    public traverseDFSRecursive(
        rootId: string,
        callback: TraverseCallback<Vertex<T>>,
    ) {
        const visited = new Set<string>()

        const recurse = (currentId: string) => {
            const currentVertex = this.get(currentId)
            if (!currentVertex) return

            callback(currentVertex)
            visited.add(currentVertex.id)

            currentVertex.forEachEdge(({ to }) => {
                if (!visited.has(to)) recurse(to)
            })
        }

        recurse(rootId)
    }

    // public traverseDFSIterative(
    //     rootId: string,
    //     callback: TraverseCallback<Vertex<T>>,
    // ) {
    //     const rootVertex = this.get(rootId)
    //     if (!rootVertex) return

    //     const stack = new Stack<string>()
    //     const visited = new Set<string>()

    //     stack.push(rootId)
    //     visited.add(rootId)

    //     let currentId: string | undefined = rootId

    //     while (currentId = stack.pop()) { // eslint-disable-line no-cond-assign
    //         const currentVertex = this.get(currentId)!

    //         currentVertex.forEachEdge(({ to }) => {
    //             if (!visited.has(to)) {
    //                 stack.push(to)
    //                 visited.add(to)
    //             }
    //         })

    //         callback(currentVertex)
    //     }
    // }

    public traverseBFS(
        rootId: string,
        callback: TraverseCallback<Vertex<T>>,
    ) {
        const rootVertex = this.get(rootId)
        if (!rootVertex) return

        const queue = new Queue<string>()
        const visited = new Set<string>()

        queue.enqueue(rootId)
        visited.add(rootId)

        let currentId: string | undefined = rootId

        while (currentId = queue.dequeue()) { // eslint-disable-line no-cond-assign
            const currentVertex = this.get(currentId)!

            currentVertex.forEachEdge(({ to }) => {
                if (!visited.has(to)) {
                    queue.enqueue(to)
                    visited.add(to)
                }
            })

            callback(currentVertex)
        }
    }

    // WORK IN PROGRESS

    // /**
    //  * Returns a new graph from the root and its direct neighbours
    //  * OR N-deep relations
    //  */
    // public subset(rootId: string, n = 1) {

    // }

    /**
     * Returns an empty graph based on current graph configuration.
     */
    // private template() {
    //     return new ListGraph({
    //         directed: this.isDirected,
    //         weighted: this.isWeighted,
    //         defaultWeight: this.defaultWeight,
    //     })
    // }

    // public filter(filter: FilterFunction<Vertex<T>>): ListGraph {
    // }

    // TODO: rewrite all
    // public map<R>(mapCb: MapFunction<Vertex<T>, R>): ListGraph<R> {
    //     const newGraph = this.template()
    //     this.data.forEach((vertex) => {
    //         const { id, data } = mapCb(vertex)
    //         newGraph.addVertex(id, data)

    //         // not good: adds edges twice if not directed in current implementation
    //         vertex.edges().forEach(({ from, to, weight }) => newGraph.addEdge(from, to, weight))
    //     })
    //     return newGraph
    // }
}

export type {
    Vertex,
    Edge,
}

export { ListGraph }
