import type {
    Vertex,
    Edge,
} from './list-graph'
import { ListGraph } from './list-graph'

// Note: this is still a mess
// Refacto in progress

interface Graph<T> {
    /**
     * Retrieves the vertex corresponding to given id.
     *
     * @param id - The vertex id.
     * @returns - The matching `Vertex` or `undefined` if not found.
     */
    get(id: string): Vertex<T> | undefined

    /**
     * Retrieves an edge connecting two vertices. The parameters order
     * only matter in the case of a directed graph.
     * 
     * @param id - The queried vertex id.
     * @returns The matched `Vertex` or `undefined` if not found
     */
    getEdge(from: string, to: string): Edge | undefined

    /**
     * Adds a new vertex, referenced with a **unique** id, holding given data.
     * If the given id is already used, the insertion is aborted.
     *
     * @param id - The vertex ID.  **Must be unique**
     * @param data - Additionnal data.
     * @returns `true` or `false` if it failed to insert.
     */
    addVertex(id: string, data?: any): boolean

    /**
     * Removes vertex qith given id and its related edges.
     *
     * @param id - id of the vertex to be removed.
     * @returns `true` or `false` if the vertex is not found.
     */
    removeVertex(id: string): boolean

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
    addEdge(from: string, to: string, weight: number): boolean

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
    removeEdge(from: string, to: string): boolean
}

/**
 * The possible options for a Graph.
 */
type GraphOptions = {
    /**
     * Whether edges should be added in both direction.
     */
    directed?: boolean,

    /**
     * Whether the edges should be assigner a weight value.
     * Note: unused for now. A weight can be added no matter
     * this value, and if not a default value is used.
     */
    weighted?: boolean,

    /**
     * The default weight value to add to the edges.
     */
    defaultWeight?: number,
}

/*
class EdgeSet extends Set<Edge> {
    public hasVertex(id: string): boolean {
        return this.actionOnMatch(id, () => true) ?? false
    }

    public getEdge(id: string): Edge<T> | undefined {
        return this.actionOnMatch(id, (edge) => edge)
    }

    public deleteVertex(id: string): boolean {
        return this.actionOnMatch(id, (edge) => this.delete(edge)) ?? false
    }

    private actionOnMatch<R>(
        id: string,
        action: (edge: Edge<T>) => R,
    ): R | undefined {
        for (const edge of this) if (edge.vertex.id === id) return action(edge)
        return undefined
    }
}
*/

// class AdjacencyList extends Map<string, EdgeSet> implements GraphSource {}

// class AdjacencyMatrix extends Array<Array<number>> implements GraphSource {}

// interface GraphSource<T extends string | number> {
//     has(vertex: T): boolean
//     set(vertex: T): void
//     delete(vertex: T): T
// }

export type {
    Vertex,
    GraphOptions,
}

export {
    Graph,
    ListGraph,
}
