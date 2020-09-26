const copyStatics = require('./copy-statics')
const clearPackageDirectory = require('./clear-package-directory')
const compile = require('./compile')

const PATH = process.env.BUILD_PATH || './package'
const TS_CONFIG = 'tsconfig.build.json'

function build(path, tsconfig) {
    clearPackageDirectory(path)
    copyStatics(path)
    compile(path, tsconfig)
}

build(PATH, TS_CONFIG)
