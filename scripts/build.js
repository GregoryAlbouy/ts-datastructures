const copyStatics = require('./copy-statics')
const clearPackageDirectory = require('./clear-package-directory')
const compile = require('./compile')

const PATH = process.env.BUILD_PATH
const TSCONFIG = process.env.BUILD_TSCONFIG

function build(path, tsconfig) {
    if (!path) throw new Error('missing BUILD_PATH environment variable')
    if (!tsconfig) throw new Error('missing BUILD_TSCONFIG environment variable')

    clearPackageDirectory(path)
    copyStatics(path)
    compile(path, tsconfig)
}

build(PATH, TSCONFIG)
