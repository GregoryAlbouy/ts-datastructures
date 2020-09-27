// Convenience server for quick access to test coverage report or generated docs.
// It gets the path of the directory to be served directly from the config file
// output option.
//
// Note: this script is meant to be run via `npm run`. It implies
// that all paths are relative to the root directory, not /scripts/.
// In consequence, running this file directly won't work.

const path = require('path')
const express = require('express')
const server = express()

const PORT = process.env.PORT
const DOCUMENT = process.env.SERVE_DOCUMENT // 'coverage' or 'docs'

function serve(type) {
    const document = {
        coverage: { name: 'Coverage report', getPath: getCoveragePath, port: 9998 },
        docs: { name: 'Docs', getPath: getDocsPath, port: 9997 },
    }[type]
    const path = document.getPath()
    const port = PORT || document.port

    server.use('/', express.static(path))
    server.listen(port)
    console.log(`${document.name} served at http://localhost:${port}`)
}

function getCoveragePath() {
    const { coverageDirectory } = require(path.resolve('./', 'jest.config.js'))
    return path.resolve(coverageDirectory, 'lcov-report')
}

function getDocsPath() {
    const { out } = require(path.resolve('./', 'typedoc.config.js'))
    return out
}

serve(DOCUMENT)
