import { ListGraph, Vertex } from '../src/graph'

describe('list graph', function() {
    let graph: ListGraph<{ desc?: string }>
    let dgraph: ListGraph<{ desc?: string }>

    beforeEach(function() {
        graph = newTestGraph()
        dgraph = newTestDirectedGraph()
    })

    describe('getters', function() {
        it('should return correct order', function() {
            expect(graph.order).toEqual(9)
            expect(dgraph.order).toEqual(5)
        })

        it('should return correct size', function() {
            expect(graph.size).toEqual(13)
            expect(dgraph.size).toEqual(8)
        })

        it('should return existant vertexes', function() {
            expect(graph.get('book')).toBeDefined()
            expect(dgraph.get('luke')).toBeDefined()
        })

        it('should return defined edges (directed)', function() {
            // double connection
            expect(dgraph.getEdge('luke', 'leia')).toBeDefined()
            expect(dgraph.getEdge('leia', 'luke')).toBeDefined()

            // single connection
            expect(dgraph.getEdge('character', 'frodo')).toBeDefined()
        })

        it('should return defined edges (undirected)', function() {
            // undirected
            expect(graph.getEdge('movie', 'action')).toBeDefined()
            expect(graph.getEdge('action', 'movie')).toBeDefined()
        })

        it('should not return undefined edges', function() {
            expect(graph.getEdge('media', 'action')).toBeUndefined()
            expect(dgraph.getEdge('frodo', 'character')).toBeUndefined()
        })

        it('should return array representations', function() {
            const ids = ['romance', 'thriller', 'media', 'support',
                'book', 'movie', 'paper', 'screen', 'action']
            const edgeTos = ['book', 'movie', 'book', 'movie', 'book',
                'movie', 'support', 'media', 'paper', 'screen', 'media',
                'paper', 'action', 'romance', 'thriller', 'media', 'screen',
                'action', 'romance', 'thriller', 'book', 'support', 'movie',
                'support', 'book', 'movie']

            expect(graph.vertices().map(({ id }) => id)).toEqual(ids)
            expect(graph.edges().map(({ to }) => to)).toEqual(edgeTos)
        })
    })

    describe('add vertexes', function() {
        it('should add new vertex', function() {
            expect(dgraph.addVertex('Kev Adams', {})).toBeTruthy()
            expect(dgraph.order).toEqual(6)
        })

        it('should not add already defined vertex', function() {
            expect(dgraph.addVertex('luke', {})).toBeFalsy()
            expect(dgraph.order).toEqual(5)
        })
    })

    describe('add edges', function() {
        it('should add inexisting edges (directed)', function() {
            expect(dgraph.addEdge('gandalf', 'leia')).toBeTruthy()
            expect(dgraph.getEdge('gandalf', 'leia')).toBeDefined()
            expect(dgraph.getEdge('leia', 'gandalf')).toBeUndefined()
            expect(dgraph.get('gandalf')?.size).toEqual(2)
            expect(dgraph.get('leia')?.size).toEqual(1)
        })

        it('should add inexisting edges (undirected)', function() {
            expect(graph.addEdge('movie', 'support')).toBeTruthy()
            expect(graph.getEdge('movie', 'support')).toBeDefined()
            expect(graph.getEdge('support', 'movie')).toBeDefined()
            expect(graph.get('movie')?.size).toEqual(6)
            expect(graph.get('support')?.size).toEqual(4)
        })

        it('should add weighted edge (directed)', function() {
            dgraph.addEdge('frodo', 'character', 42)
            expect(dgraph.getEdge('frodo', 'character')?.weight).toEqual(42)
        })

        it('should add weighted edge (undirected)', function() {
            graph.addEdge('movie', 'support', 42)
            expect(graph.getEdge('movie', 'support')?.weight).toEqual(42)
            expect(graph.getEdge('support', 'movie')?.weight).toEqual(42)
        })

        it('should not add existing edges (directed)', function() {
            expect(dgraph.addEdge('frodo', 'gandalf')).toBeFalsy()
            expect(dgraph.get('frodo')?.size).toEqual(1)
        })

        it('should not add existing edges (undirected)', function() {
            expect(graph.addEdge('media', 'book')).toBeFalsy()
            expect(graph.get('media')?.size).toEqual(3)
        })

        it('should not add edges for inexistant vertex', function() {
            expect(graph.addEdge('null', 'book')).toBeFalsy()
            expect(graph.addEdge('book', 'null')).toBeFalsy()
            expect(graph.addEdge('null', 'null')).toBeFalsy()
            expect(graph.order).toEqual(9)
            expect(graph.size).toEqual(13)
        })
    })

    describe('update weight', function() {
        it('should have default weight in both directions', function() {
            expect(graph.getEdgeWeight('media', 'book')).toEqual(5)
            expect(graph.getEdgeWeight('book', 'media')).toEqual(5)
        })

        it('should update default weight', function() {
            graph.setDefaultWeight(42)
            graph.addEdge('movie', 'book')
            expect(graph.getEdgeWeight('movie', 'book')).toEqual(42)
        })

        it('should update weight of defined edge in both directions', function() {
            expect(graph.setEdgeWeight('movie', 'action', 42)).toBeTruthy()
            expect(graph.getEdgeWeight('movie', 'action')).toEqual(42)
            expect(graph.getEdgeWeight('action', 'movie')).toEqual(42)
        })

        it('should not update weight of undefined edge', function() {
            expect(graph.setEdgeWeight('media', 'action', 42)).toBeFalsy()
            expect(graph.getEdgeWeight('media', 'action')).toBeUndefined()
            expect(graph.getEdgeWeight('action', 'media')).toBeUndefined()
        })
    })

    describe('remove vertex', function() {
        it('should remove existant vertex and its edges', function() {
            expect(dgraph.removeVertex('luke')).toBeTruthy()
            expect(dgraph.get('luke')).toBeUndefined()
            expect(dgraph.getEdge('leia', 'luke')).toBeUndefined()
            expect(dgraph.getEdge('character', 'luke')).toBeUndefined()
            expect(dgraph.order).toEqual(4)
        })

        it('should not remove inexistant vertex', function() {
            expect(dgraph.removeVertex('null')).toBeFalsy()
            expect(dgraph.order).toEqual(5)
        })
    })

    describe('reset vertex', function() {
        it('should reset vertex and update edges', function() {
            expect(dgraph.resetVertex('luke')).toBeTruthy()
            expect(dgraph.getEdge('leia', 'luke')).toBeUndefined()
            expect(dgraph.getEdge('character', 'luke')).toBeUndefined()
            expect(dgraph.order).toEqual(5)
        })

        it('should not reset inexistant vertex', function() {
            expect(dgraph.resetVertex('null')).toBeFalsy()
            expect(dgraph.order).toEqual(5)
        })
    })

    describe('remove edge', function() {
        it('should remove defined edge (directed)', function() {
            expect(dgraph.removeEdge('frodo', 'gandalf')).toBeTruthy()
            expect(dgraph.getEdge('frodo', 'gandalf')).toBeUndefined()
            expect(dgraph.getEdge('gandalf', 'frodo')).toBeDefined()
            expect(dgraph.get('frodo')?.size).toEqual(0)
            expect(dgraph.get('gandalf')?.size).toEqual(1)
        })

        it('should remove defined edge (undirected)', function() {
            expect(graph.removeEdge('book', 'romance')).toBeTruthy()
            expect(graph.getEdge('book', 'romance')).toBeUndefined()
            expect(graph.getEdge('romance', 'book')).toBeUndefined()
            expect(graph.get('book')?.size).toEqual(4)
            expect(graph.get('romance')?.size).toEqual(1)
        })

        it('should not remove undefined edge (directed)', function() {
            // no connection
            expect(dgraph.removeEdge('luke', 'frodo')).toBeFalsy()
            expect(dgraph.get('luke')?.size).toEqual(1)
            expect(dgraph.get('frodo')?.size).toEqual(1)

            // opposed connection
            expect(dgraph.removeEdge('luke', 'character')).toBeFalsy()
            expect(dgraph.get('luke')?.size).toEqual(1)
            expect(dgraph.get('character')?.size).toEqual(4)
        })

        it('should not remove undefined edge (undirected)', function() {
            expect(graph.removeEdge('media', 'action')).toBeFalsy()
            expect(graph.get('media')?.size).toEqual(3)
            expect(graph.get('action')?.size).toEqual(2)
        })
    })

    describe('traversal', function() {
        const storeIn = (arr: string[]) => (v: Vertex<any>) => arr.push(v.id)
        const DFSResult = [
            'media', 'book', 'paper', 'support', 'screen',
            'movie', 'action', 'romance', 'thriller',
        ]
        const BFSResult = [
            'media', 'book', 'movie', 'support', 'paper',
            'action', 'romance', 'thriller', 'screen',
        ]

        let lukeGroup: string[],
            characterGroup: string[],
            mediaGroup: string[]

        beforeEach(function() {
            lukeGroup = []
            characterGroup = []
            mediaGroup = []
        })

        it('should traverseDFSRecursive a group (undirected)', function() {
            graph.traverseDFSRecursive('media', storeIn(mediaGroup))
            expect(mediaGroup).toStrictEqual(DFSResult)
        })

        // it('should traverseDFSIterative a group (undirected)', function() {
        //     graph.traverseDFSIterative('media', storeIn(mediaGroup))
        //     expect(mediaGroup).toStrictEqual(DFSResult)
        // })

        it('should traverseBFS a group (undirected)', function() {
            graph.traverseBFS('media', storeIn(mediaGroup))
            expect(mediaGroup).toStrictEqual(BFSResult)
        })

        it('should traverseDFSRecursive a group (directed)', function() {
            dgraph.traverseDFSRecursive('luke', storeIn(lukeGroup))
            dgraph.traverseDFSRecursive('character', storeIn(characterGroup))

            expect(lukeGroup).toStrictEqual(['luke', 'leia'])
            dgraph.vertices().forEach(({ id }) => expect(characterGroup).toContain(id))
            expect(characterGroup.length).toEqual(5)
        })

        // it('should traverseDFSIterative a group (directed)', function() {
        //     dgraph.traverseDFSIterative('luke', storeIn(lukeGroup))
        //     dgraph.traverseDFSIterative('character', storeIn(characterGroup))

        //     expect(lukeGroup).toStrictEqual(['luke', 'leia'])
        //     dgraph.vertices().forEach(({ id }) => expect(characterGroup).toContain(id))
        //     expect(characterGroup.length).toEqual(5)
        // })

        it('should traverseBFS a group (directed)', function() {
            dgraph.traverseBFS('luke', storeIn(lukeGroup))
            dgraph.traverseBFS('character', storeIn(characterGroup))

            expect(lukeGroup).toStrictEqual(['luke', 'leia'])
            dgraph.vertices().forEach(({ id }) => expect(characterGroup).toContain(id))
            expect(characterGroup.length).toEqual(5)
        })
    })
})

function newTestDirectedGraph() {
    const dgraph = new ListGraph<{ desc: string }>({
        directed: true,
        weighted: true,
        defaultWeight: 5,
    })
    const vertices = ['luke', 'leia', 'frodo', 'gandalf', 'character']

    vertices
        .map((id) => (dgraph.addVertex(id, { desc: `${id} is cool` }), id)) // eslint-disable-line no-sequences
        .filter((vertex) => vertex !== 'character')
        .forEach((vertex) => dgraph.addEdge('character', vertex))

    dgraph.addEdge('luke', 'leia')
    dgraph.addEdge('leia', 'luke')
    dgraph.addEdge('frodo', 'gandalf')
    dgraph.addEdge('gandalf', 'frodo')
    return dgraph
}

function newTestGraph() {
    const graph = new ListGraph<{ desc: string }>({
        defaultWeight: 5,
    })
    const vertices = [
        'romance',
        'thriller',
        'media',
        'support',
        'book',
        'movie',
        'paper',
        'screen',
        'action',
    ]

    vertices.forEach((id) => graph.addVertex(id, { desc: `${id} is cool` }))
    graph.addEdge('media', 'book')
    graph.addEdge('media', 'movie')
    graph.addEdge('media', 'support')
    graph.addEdge('book', 'paper')
    graph.addEdge('book', 'action')
    graph.addEdge('book', 'romance')
    graph.addEdge('book', 'thriller')
    graph.addEdge('movie', 'screen')
    graph.addEdge('movie', 'action')
    graph.addEdge('movie', 'romance')
    graph.addEdge('movie', 'thriller')
    graph.addEdge('support', 'paper')
    graph.addEdge('support', 'screen')

    return graph
}
