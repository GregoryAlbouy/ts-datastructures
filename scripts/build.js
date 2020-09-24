'use strict'

const copyStatics = require('./copy-statics')
const clearPackageDirectory = require('./clear-package-directory')
const compile = require('./compile')

const PATH = process.env.BUILD_PATH || './package'

function build(path) {
    clearPackageDirectory(path)
    copyStatics(path)
    compile(path)
}

build(PATH)
