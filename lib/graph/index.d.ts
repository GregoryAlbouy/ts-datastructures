import { ListGraph } from './list-graph';
interface Graph<T extends number | string> {
    get(vertex: Vertex<T>): EdgeSet | undefined;
    getEdge(vertexA: Vertex<T>, vertexB: Vertex<T>): Edge | undefined;
    addVertex(vertex: string): boolean;
    removeVertex(vertex: string): boolean;
    addEdge(vertexA: string, vertexB: string, weight: number): boolean;
    removeEdge(vertexA: string, vertexB: string): boolean;
    addDirectedEdge(from: string, to: string, weight: number): boolean;
    removeDirectedEdge(from: string, to: string): boolean;
}
declare type Vertex<T extends string | number> = T;
declare class Edge {
    vertex: Vertex<string>;
    weight: number;
    constructor(vertex: Vertex<string>, weight: number);
    setWeight(weight: number): boolean;
}
declare class EdgeSet extends Set<Edge> {
    hasVertex(vertex: Vertex<string>): boolean;
    getEdge(vertex: Vertex<string>): Edge | undefined;
    deleteVertex(vertex: Vertex<string>): boolean;
    private actionOnMatch;
}
export type { Vertex, };
export { Graph, ListGraph, Edge, EdgeSet, };
