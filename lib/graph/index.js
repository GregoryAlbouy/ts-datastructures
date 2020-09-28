"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeSet = exports.Edge = exports.ListGraph = void 0;
const list_graph_1 = require("./list-graph");
Object.defineProperty(exports, "ListGraph", { enumerable: true, get: function () { return list_graph_1.ListGraph; } });
class Edge {
    constructor(vertex, weight) {
        this.vertex = vertex;
        this.weight = weight;
    }
    setWeight(weight) {
        this.weight = weight;
        return true;
    }
}
exports.Edge = Edge;
// Todo: change set to map?
class EdgeSet extends Set {
    hasVertex(vertex) {
        var _a;
        return (_a = this.actionOnMatch(vertex, () => true)) !== null && _a !== void 0 ? _a : false;
    }
    getEdge(vertex) {
        return this.actionOnMatch(vertex, (edge) => edge);
    }
    deleteVertex(vertex) {
        var _a;
        return (_a = this.actionOnMatch(vertex, (edge) => this.delete(edge))) !== null && _a !== void 0 ? _a : false;
    }
    actionOnMatch(vertex, action) {
        for (const edge of this)
            if (edge.vertex === vertex)
                return action(edge);
        return undefined;
    }
}
exports.EdgeSet = EdgeSet;
