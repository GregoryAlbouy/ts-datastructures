import type { Vertex } from '.';
import { Graph, EdgeSet, Edge } from '.';
declare class ListGraph implements Graph<string> {
    data: Map<string, EdgeSet>;
    get size(): number;
    get(vertex: Vertex<string>): EdgeSet | undefined;
    getEdge(from: Vertex<string>, to: Vertex<string>): Edge | undefined;
    addVertex(vertex: Vertex<string>): boolean;
    removeVertex(vertex: Vertex<string>): boolean;
    resetVertex(vertex: Vertex<string>): boolean;
    addEdge(vertexA: Vertex<string>, vertexB: Vertex<string>, weight?: number): boolean;
    removeEdge(vertexA: Vertex<string>, vertexB: Vertex<string>): boolean;
    addDirectedEdge(from: Vertex<string>, to: Vertex<string>, weight?: number): boolean;
    removeDirectedEdge(from: Vertex<string>, to: Vertex<string>): boolean;
    getEdgeWeight(from: Vertex<string>, to: Vertex<string>): number | undefined;
    setEdgeWeight(from: Vertex<string>, to: Vertex<string>, weight: number): boolean;
}
export { ListGraph };
