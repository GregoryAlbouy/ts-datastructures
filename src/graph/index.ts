import ListGraph from './list-graph'

// TODO: change temporary `void` return type
interface Graph {
    addVertex(vertex: string): void
    removeVertex(vertex: string): void
    addEdge(vertexA: string, vertexB: string, weight: number): void
    removeEdge(vertexA: string, vertexB: string): void
    addDirectedEdge(from: string, to: string, weight: number): void
    removeDirectedEdge(from: string, to: string): void
}

export {
    Graph,
    ListGraph,
}
