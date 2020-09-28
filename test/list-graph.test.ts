import { ListGraph } from '../src/graph'

describe('list graph', function() {
    let graph: ListGraph

    beforeEach(function() {
        graph = newTestGraph()
    })

    describe('getters', function() {
        it('should return correct size', function() {
            expect(graph.size).toEqual(5)
        })

        it('should return existant vertexes', function() {
            expect(graph.get('luke')).toBeDefined()
        })

        it('should return defined edges', function() {
            // full edge
            expect(graph.getEdge('luke', 'leia')).toBeDefined()
            expect(graph.getEdge('leia', 'luke')).toBeDefined()

            // directed edge
            expect(graph.getEdge('movie', 'frodo')).toBeDefined()
        })

        it('should not return undefined edges', function() {
            expect(graph.getEdge('frodo', 'movie')).toBeUndefined()
        })
    })

    describe('add vertexes', function() {
        it('should add new vertex', function() {
            expect(graph.addVertex('Kev Adams')).toBeTruthy()
            expect(graph.data.size).toEqual(6)
        })

        it('should not add already defined vertex', function() {
            expect(graph.addVertex('luke')).toBeFalsy()
            expect(graph.data.size).toEqual(5)
        })
    })

    describe('add edges', function() {
        it('should add inexisting/half edges', function() {
            // half direction exists
            expect(graph.addEdge('gandalf', 'movie')).toBeTruthy()
            expect(graph.get('gandalf')?.getEdge('movie')).toBeDefined()

            // other direction exists
            expect(graph.addDirectedEdge('leia', 'movie')).toBeTruthy()
            expect(graph.get('leia')?.getEdge('movie')).toBeDefined()

            expect(graph.get('movie')?.size).toEqual(4)
            expect(graph.get('gandalf')?.size).toEqual(2)
            expect(graph.get('leia')?.size).toEqual(2)
        })

        it('should add weighted edge', function() {
            graph.addDirectedEdge('frodo', 'movie', 42)
            expect(graph.getEdge('frodo', 'movie')).toEqual({ vertex: 'movie', weight: 42 })
        })

        it('should not add existing edges', function() {
            // edge exists
            expect(graph.addEdge('frodo', 'gandalf')).toBeFalsy()
            expect(graph.get('frodo')?.size).toEqual(1)

            // directed edge exists
            expect(graph.addDirectedEdge('movie', 'luke')).toBeFalsy()
            expect(graph.get('movie')?.size).toEqual(4)
        })

        it('should not add edges for inexistant vertex', function() {
            expect(graph.addEdge('null', 'luke')).toBeFalsy()
            expect(graph.addEdge('luke', 'null')).toBeFalsy()
            expect(graph.addEdge('null', 'null')).toBeFalsy()
            expect(graph.data.size).toEqual(5)
        })
    })

    describe('update weight', function() {
        it('should have default weight', function() {
            graph.addEdge('frodo', 'leia')
            expect(graph.getEdge('frodo', 'leia')?.weight).toEqual(1)
        })

        it('should update weight of defined edge', function() {
            expect(graph.setEdgeWeight('movie', 'gandalf', 42)).toBeTruthy()
            expect(graph.getEdgeWeight('movie', 'gandalf')).toEqual(42)
        })

        it('should not update weight of undefined edge', function() {
            expect(graph.setEdgeWeight('gandalf', 'movie', 42)).toBeFalsy()
            expect(graph.getEdgeWeight('gandalf', 'movie')).toBeUndefined()
        })
    })

    describe('remove vertex', function() {
        it('should remove existant vertex and its edges', function() {
            expect(graph.removeVertex('luke')).toBeTruthy()
            expect(graph.getEdge('leia', 'luke')).toBeUndefined()
            expect(graph.getEdge('movie', 'luke')).toBeUndefined()
            expect(graph.size).toEqual(4)
        })

        it('should not remove inexistant', function() {
            expect(graph.removeVertex('null')).toBeFalsy()
            expect(graph.size).toEqual(5)
        })
    })

    describe('reset vertex', function() {
        it('should reset vertex and update edges', function() {
            expect(graph.resetVertex('luke')).toBeTruthy()
            expect(graph.getEdge('leia', 'luke')).toBeUndefined()
            expect(graph.getEdge('movie', 'luke')).toBeUndefined()
            expect(graph.size).toEqual(5)
        })

        it('should not reset inexistant vertex', function() {
            expect(graph.resetVertex('null')).toBeFalsy()
        })
    })

    describe('remove edge', function() {
        it('should remove defined edge', function() {
            // remove full edge
            expect(graph.removeEdge('frodo', 'gandalf')).toBeTruthy()
            expect(graph.getEdge('frodo', 'gandalf')).toBeUndefined()
            expect(graph.getEdge('gandalf', 'frodo')).toBeUndefined()

            // remove single direction from double direction
            expect(graph.removeDirectedEdge('luke', 'leia')).toBeTruthy()
            expect(graph.getEdge('luke', 'leia')).toBeUndefined()
            expect(graph.getEdge('leia', 'luke')).toBeDefined()

            // remove double direction from single direction
            expect(graph.removeEdge('movie', 'leia')).toBeTruthy()
            expect(graph.getEdge('movie', 'leia')).toBeUndefined()
            expect(graph.getEdge('leia', 'movie')).toBeUndefined()

            // check sizes
            expect(graph.get('frodo')?.size).toEqual(0)
            expect(graph.get('leia')?.size).toEqual(1)
            expect(graph.get('movie')?.size).toEqual(3)
        })

        it('should not remove undefined edge', function() {
            // remove double edge from no edge
            expect(graph.removeEdge('luke', 'frodo')).toBeFalsy()
            expect(graph.get('luke')?.size).toEqual(1)
            expect(graph.get('frodo')?.size).toEqual(1)

            // remove single edge from no edge
            expect(graph.removeDirectedEdge('luke', 'frodo')).toBeFalsy()
            expect(graph.get('luke')?.size).toEqual(1)

            // remove single edge from opposed direction
            expect(graph.removeDirectedEdge('gandalf', 'movie')).toBeFalsy()
            expect(graph.get('gandalf')?.size).toEqual(1)
        })

        // describe('traversal', function() {
        //     it('should store values in array', function() {
        //         const array: string[] = []
        //         const storeCallback = (vtx: string) => array.push(vtx)
        //         const start = 'gandalf'
        //         graph.traverseDFSRecursive(start, storeCallback)

        //         graph.data.forEach((v) => expect(array).toContain(v))
        //     })
        // })
    })
})

function newTestGraph() {
    const graph = new ListGraph()
    const vertexes = ['luke', 'leia', 'frodo', 'gandalf', 'movie']

    vertexes
        .map((vertex) => (graph.addVertex(vertex), vertex)) // eslint-disable-line
        .filter((vertex) => vertex !== 'movie')
        .forEach((vertex) => graph.addDirectedEdge('movie', vertex))

    graph.addEdge('luke', 'leia')
    graph.addEdge('frodo', 'gandalf')
    return graph
}
