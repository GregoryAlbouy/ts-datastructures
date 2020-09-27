import { ListGraph } from '../src/graph'

describe('list graph', function() {
    let graph: ListGraph

    beforeEach(function() {
        graph = newTestGraph()
    })

    it('getters', function() {
        expect(graph.data.get('luke')).toBeDefined()
        expect(graph.data.get('luke')?.getEdge('leia')).toBeDefined()
        expect(graph.data.get('leia')?.getEdge('luke')).toBeDefined()
        expect(graph.data.get('movie')?.getEdge('frodo')).toBeDefined()
        expect(graph.data.get('frodo')?.getEdge('movie')).toBeUndefined()
    })

    it('add', function() {
        const addExistingVertex = graph.addVertex('luke')
        const addExistingEdge = graph.addEdge('luke', 'leia')
        const addInvalidEdge0 = graph.addEdge('null', 'luke')
        const addInvalidEdge1 = graph.addEdge('luke', 'null')
        const addInvalidEdge2 = graph.addEdge('gandalf', 'movie')
        const addValidDirectedEdge = graph.addDirectedEdge('gandalf', 'movie')

        expect(addExistingVertex).toBeFalsy()
        expect(addExistingEdge).toBeFalsy()
        expect(addInvalidEdge0).toBeFalsy()
        expect(addInvalidEdge1).toBeFalsy()
        expect(addInvalidEdge2).toBeFalsy()
        expect(addValidDirectedEdge).toBeTruthy()
        expect(graph.data.size).toEqual(5)
        expect(graph.data.get('luke')?.getEdge('leia')).toEqual({ vertex: 'leia', weight: 42 })
        expect(graph.data.get('luke')?.getEdge('movie')).toBeUndefined()
        expect(graph.getEdgeWeight('leia', 'luke')).toEqual(42)

        expect(graph.data.get('gandalf')?.size).toEqual(2)
        expect(graph.data.get('movie')?.size).toEqual(4)
        expect(graph.data.get('movie')?.getEdge('frodo')).toEqual({ vertex: 'frodo', weight: 7 })
    })

    it('set weight', function() {
        const setGandalf = graph.setEdgeWeight('movie', 'gandalf', 1000)
        const falsy = graph.setEdgeWeight('gandalf', 'movie', 10)

        expect(setGandalf).toEqual(true)
        expect(falsy).toEqual(false)
        expect(graph.getEdgeWeight('movie', 'gandalf')).toEqual(1000)
        expect(graph.getEdgeWeight('gandalf', 'movie')).toBeUndefined()
    })

    it('remove vertex', function() {
        const removeLuke = graph.removeVertex('luke')
        const removeNull = graph.removeVertex('null')

        expect(removeLuke).toEqual(true)
        expect(removeNull).toEqual(false)

        expect(graph.data.get('luke')).toBeUndefined()
        expect(graph.data.get('leia')?.size).toEqual(0)
        expect(graph.data.get('movie')?.size).toEqual(3)
        expect(graph.data.get('movie')?.getEdge('luke')).toBeUndefined()
    })

    it('reset vertex', function() {
        const resetLuke = graph.resetVertex('luke')
        const resetNull = graph.resetVertex('null')

        expect(resetLuke).toEqual(true)
        expect(resetNull).toEqual(false)

        expect(graph.data.get('luke')?.size).toEqual(0)
        expect(graph.data.get('leia')?.size).toEqual(0)
        expect(graph.data.get('movie')?.size).toEqual(3)
        expect(graph.data.get('movie')?.getEdge('luke')).toBeUndefined()
    })

    it('remove edge', function() {
        const truthies = [
            graph.removeEdge('frodo', 'gandalf'),
            graph.removeDirectedEdge('leia', 'luke'),
            graph.removeDirectedEdge('movie', 'leia'),
        ]
        const falsies = [
            graph.removeEdge('luke', 'movie'),
            graph.removeEdge('movie', 'luke'),
            graph.removeDirectedEdge('leia', 'gandalf'),
            graph.removeDirectedEdge('leia', 'movie'),
            graph.removeDirectedEdge('null', 'frodo'),
            graph.removeDirectedEdge('frodo', 'null'),
        ]

        truthies.forEach((truthy) => expect(truthy).toEqual(true))
        falsies.forEach((falsy) => expect(falsy).toEqual(false))

        expect(graph.data.get('leia')?.size).toEqual(0)
        expect(graph.data.get('luke')?.size).toEqual(1)
        expect(graph.data.get('movie')?.size).toEqual(3)

        expect(graph.data.get('luke')?.getEdge('leia')).toEqual({ vertex: 'leia', weight: 42 })
        expect(graph.data.get('movie')?.getEdge('leia')).toBeUndefined()
    })
})

function newTestGraph() {
    const graph = new ListGraph()
    const vertexes = ['luke', 'leia', 'frodo', 'gandalf', 'movie']

    vertexes.forEach((vertex) => graph.addVertex(vertex))
    vertexes
        .filter((vertex) => vertex !== 'movie')
        .forEach((vertex) => graph.addDirectedEdge('movie', vertex, 7))
    graph.addEdge('luke', 'leia', 42)
    graph.addEdge('frodo', 'gandalf')
    return graph
}
