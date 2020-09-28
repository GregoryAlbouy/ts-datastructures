// import type { TraverseCallback } from '../_shared/types'
import type { Vertex } from '.'
import {
    Graph,
    EdgeSet,
    Edge,
} from '.'

class ListGraph implements Graph<string> {
    data = new Map<Vertex<string>, EdgeSet>()

    get size(): number {
        return this.data.size
    }

    public get(vertex: Vertex<string>): EdgeSet | undefined {
        return this.data.get(vertex)
    }

    public getEdge(from: Vertex<string>, to: Vertex<string>): Edge | undefined {
        return this.get(from)?.getEdge(to)
    }

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

    // TODO: reconsider behaviour when one of the two directions already exists.
    // Let's not forget the weight: should it be replaced in such case?
    // Maybe just block any addition as soon as a connection exists.
    public addEdge(vertexA: Vertex<string>, vertexB: Vertex<string>, weight = 1): boolean {
        const edgeAddedA = this.addDirectedEdge(vertexA, vertexB, weight)
        const edgeAddedB = this.addDirectedEdge(vertexB, vertexA, weight)
        return edgeAddedA || edgeAddedB
    }

    public removeEdge(vertexA: Vertex<string>, vertexB: Vertex<string>): boolean {
        const edgeRemovedA = this.removeDirectedEdge(vertexA, vertexB)
        const edgeRemovedB = this.removeDirectedEdge(vertexB, vertexA)
        return edgeRemovedA || edgeRemovedB
    }

    public addDirectedEdge(from: Vertex<string>, to: Vertex<string>, weight = 1): boolean {
        const srcEdges = this.data.get(from)
        const dstEdges = this.data.get(to)

        if (!srcEdges || !dstEdges || srcEdges.hasVertex(to)) return false

        return !!srcEdges.add(new Edge(to, weight))
    }

    public removeDirectedEdge(from: Vertex<string>, to: Vertex<string>): boolean {
        const srcEdges = this.data.get(from)
        const dstEdges = this.data.get(to)

        if (!srcEdges || !dstEdges || !srcEdges.hasVertex(to)) return false

        return srcEdges.deleteVertex(to)
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

    // public traverseDFSRecursive(
    //     start: Vertex<string>,
    //     callback: TraverseCallback<Vertex<string>>,
    // ) {
    //     const visited = new Set<Vertex<string>>()

    //     const recurse = (current: Vertex<string>) => {
    //         if (!current) return

    //         callback(current)
    //         visited.add(current)

    //         this.get(current)!.forEach((edge: Edge) => {
    //             if (!visited.has(edge.vertex)) return recurse(edge.vertex)
    //         })
    //     }

    //     recurse(start)
    // }
}

export { ListGraph }
