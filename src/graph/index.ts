import ListGraph from './list-graph'

interface Graph<T> {
    addVertex(vertex: T): Graph<T>
    removeVertex(vertex: T): Graph<T>
    addEdge(vertexA: T, vertexB: T, weight: number): Graph<T>
    removeEdge(vertexA: T, vertexB: T): Graph<T>
}

export {
    Graph,
    ListGraph,
}
