import { Graph } from './'

// type Edge<T> = { vertex: T, weight: number }

class Edge<T> {
    vertex: T
    weight: number

    // default weight? 0? 1?
    constructor(vertex: T, weight: number) {
        this.vertex = vertex
        this.weight = weight
    }
}

type AdjacencyList<T> = Map<T, Set<Edge<T>>>

class ListGraph<T> implements Graph<T> {
    data: AdjacencyList<T> = new Map()

    public addVertex(vertex: T): Graph<T> {
        if (!this.data.has(vertex)) this.data.set(vertex, new Set())
        return this
    }

    public removeVertex(vertex: T): Graph<T> {
        if (!this.data.has(vertex)) return this
        this.data.delete(vertex)
        // TODO
        // this.data.forEach((edges: Set<Edge<T>>) => {
        // if (edges.has(vertex)) edges.delete(vertex)
        // })
        return this
    }

    public addEdge(vertexA: T, vertexB: T, weight: number): Graph<T> {
        const edgesA = this.data.get(vertexA)
        const edgesB = this.data.get(vertexB)

        if (!edgesA || !edgesB) return this

        edgesA.add(new Edge(vertexB, weight))
        edgesB.add(new Edge(vertexA, weight))

        return this
    }

    public removeEdge(vertexA: T, vertexB: T): Graph<T> {
        const edgesA = this.data.get(vertexA)
        const edgesB = this.data.get(vertexB)

        if (!edgesA || !edgesB) return this

        // TODO
        // edgesA.delete(vertexB)
        // edgesB.delete(vertexA)

        return this
    }
}

export default ListGraph
