import { ListGraph } from './list-graph'

// Note: this is still a mess
// Refacto in progress

interface Graph<T extends number | string> {
    get(vertex: Vertex<T>): EdgeSet | undefined
    getEdge(vertexA: Vertex<T>, vertexB: Vertex<T>): Edge | undefined

    addVertex(vertex: string): boolean
    removeVertex(vertex: string): boolean

    addEdge(vertexA: string, vertexB: string, weight: number): boolean
    removeEdge(vertexA: string, vertexB: string): boolean
    addDirectedEdge(from: string, to: string, weight: number): boolean
    removeDirectedEdge(from: string, to: string): boolean
}

type Vertex<T extends string | number> = T

class Edge {
    vertex: Vertex<string>
    weight: number

    constructor(vertex: Vertex<string>, weight: number) {
        this.vertex = vertex
        this.weight = weight
    }

    public setWeight(weight: number) {
        this.weight = weight
        return true
    }
}

// Todo: change set to map?
class EdgeSet extends Set<Edge> {
    public hasVertex(vertex: Vertex<string>): boolean {
        return this.actionOnMatch(vertex, () => true) ?? false
    }

    public getEdge(vertex: Vertex<string>): Edge | undefined {
        return this.actionOnMatch(vertex, (edge) => edge)
    }

    public deleteVertex(vertex: Vertex<string>): boolean {
        return this.actionOnMatch(vertex, (edge) => this.delete(edge)) ?? false
    }

    private actionOnMatch<T>(
        vertex: Vertex<string>,
        action: (edge: Edge) => T,
    ): T | undefined {
        for (const edge of this) if (edge.vertex === vertex) return action(edge)
        return undefined
    }
}

// class AdjacencyList extends Map<string, EdgeSet> implements GraphSource {}

// class AdjacencyMatrix extends Array<Array<number>> implements GraphSource {}

// interface GraphSource<T extends string | number> {
//     has(vertex: T): boolean
//     set(vertex: T): void
//     delete(vertex: T): T
// }

export type {
    Vertex,
}

export {
    Graph,
    ListGraph,
    Edge,
    EdgeSet,
}
