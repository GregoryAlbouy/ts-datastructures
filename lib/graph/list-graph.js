"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListGraph = void 0;
const _1 = require(".");
class ListGraph {
    constructor() {
        this.data = new Map();
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
    get size() {
        return this.data.size;
    }
    get(vertex) {
        return this.data.get(vertex);
    }
    getEdge(from, to) {
        var _a;
        return (_a = this.get(from)) === null || _a === void 0 ? void 0 : _a.getEdge(to);
    }
    addVertex(vertex) {
        if (this.data.has(vertex))
            return false;
        this.data.set(vertex, new _1.EdgeSet());
        return true;
    }
    removeVertex(vertex) {
        const vertexIsDeleted = this.data.delete(vertex);
        if (!vertexIsDeleted)
            return false;
        this.data.forEach((edgeSet) => edgeSet.deleteVertex(vertex));
        return true;
    }
    resetVertex(vertex) {
        return this.removeVertex(vertex) && this.addVertex(vertex);
    }
    // TODO: reconsider behaviour when one of the two directions already exists.
    // Let's not forget the weight: should it be replaced in such case?
    // Maybe just block any addition as soon as a connection exists.
    addEdge(vertexA, vertexB, weight = 1) {
        const edgeAddedA = this.addDirectedEdge(vertexA, vertexB, weight);
        const edgeAddedB = this.addDirectedEdge(vertexB, vertexA, weight);
        return edgeAddedA || edgeAddedB;
    }
    removeEdge(vertexA, vertexB) {
        const edgeRemovedA = this.removeDirectedEdge(vertexA, vertexB);
        const edgeRemovedB = this.removeDirectedEdge(vertexB, vertexA);
        return edgeRemovedA || edgeRemovedB;
    }
    addDirectedEdge(from, to, weight = 1) {
        const srcEdges = this.data.get(from);
        const dstEdges = this.data.get(to);
        if (!srcEdges || !dstEdges || srcEdges.hasVertex(to))
            return false;
        return !!srcEdges.add(new _1.Edge(to, weight));
    }
    removeDirectedEdge(from, to) {
        const srcEdges = this.data.get(from);
        const dstEdges = this.data.get(to);
        if (!srcEdges || !dstEdges || !srcEdges.hasVertex(to))
            return false;
        return srcEdges.deleteVertex(to);
    }
    getEdgeWeight(from, to) {
        var _a, _b;
        return (_b = (_a = this.data.get(from)) === null || _a === void 0 ? void 0 : _a.getEdge(to)) === null || _b === void 0 ? void 0 : _b.weight;
    }
    setEdgeWeight(from, to, weight) {
        var _a, _b;
        return !!((_b = (_a = this.data.get(from)) === null || _a === void 0 ? void 0 : _a.getEdge(to)) === null || _b === void 0 ? void 0 : _b.setWeight(weight));
    }
}
exports.ListGraph = ListGraph;
