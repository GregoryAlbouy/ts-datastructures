import { Graph } from '.'

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

class ListGraph implements Graph {
    data = new Map<Vertex<string>, EdgeSet>()

    public addVertex(vertex: Vertex<string>): boolean {
        if (this.data.has(vertex)) return false
        this.data.set(vertex, new EdgeSet())
        return true
    }

    public removeVertex(vertex: Vertex<string>): boolean {
        const vertexIsDeleted = this.data.delete(vertex)
        if (!vertexIsDeleted) return false
        this.data.forEach((edgeSet) => edgeSet.deleteVertex(vertex))
        return true
    }

    public resetVertex(vertex: Vertex<string>): boolean {
        return this.removeVertex(vertex) && this.addVertex(vertex)
    }

    // refacto: return this.addDirectedEge(a, b) && this.addDirectedEdge(b, a)
    public addEdge(vertexA: Vertex<string>, vertexB: Vertex<string>, weight = 1): boolean {
        return this._addEdge(false, vertexA, vertexB, weight)
    }

    // refacto: return this.removeDirectedEge(a, b) && this.removeDirectedEdge(b, a)
    public removeEdge(vertexA: Vertex<string>, vertexB: Vertex<string>): boolean {
        return this._removeEdge(false, vertexA, vertexB)
    }

    public addDirectedEdge(from: Vertex<string>, to: Vertex<string>, weight = 1): boolean {
        return this._addEdge(true, from, to, weight)
    }

    public removeDirectedEdge(from: Vertex<string>, to: Vertex<string>): boolean {
        return this._removeEdge(true, from, to)
    }

    public getEdgeWeight(from: Vertex<string>, to: Vertex<string>): number | undefined {
        return this.data.get(from)?.getEdge(to)?.weight
    }

    public setEdgeWeight(
        from: Vertex<string>,
        to: Vertex<string>,
        weight: number,
    ): boolean {
        return !!this.data.get(from)?.getEdge(to)?.setWeight(weight)
    }

    private _addEdge(
        isDirected: boolean,
        from: Vertex<string>,
        to: Vertex<string>,
        weight: number,
    ): boolean {
        const srcEdges = this.data.get(from)
        const dstEdges = this.data.get(to)

        if (!srcEdges || !dstEdges) return false
        if (srcEdges.hasVertex(to)) return false
        if (!isDirected && dstEdges.hasVertex(from)) return false

        srcEdges.add(new Edge(to, weight))
        if (!isDirected) dstEdges.add(new Edge(from, weight))
        return true
    }

    private _removeEdge(
        isDirected: boolean,
        from: Vertex<string>,
        to: Vertex<string>,
    ): boolean {
        const srcEdges = this.data.get(from)
        const dstEdges = this.data.get(to)

        if (!srcEdges || !dstEdges) return false
        if (!srcEdges.hasVertex(to)) return false
        if (!isDirected && !dstEdges.hasVertex(from)) return false

        const vertexIsDeleted = srcEdges.deleteVertex(to)
        const otherIsDeleted = isDirected ? true : dstEdges.deleteVertex(from)
        return vertexIsDeleted && otherIsDeleted
    }
}

export default ListGraph
