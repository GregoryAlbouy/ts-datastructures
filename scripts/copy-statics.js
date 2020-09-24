'use strict'

const fs = require('fs')

function copyStatics(path) {
    copyReadme(path)
    copyJsonPackage(path)
}

function copyReadme(path) {
    fs.copyFileSync('./README.md', `${path}/README.md`)
}

function copyJsonPackage(path) {
    const jsonString = fs.readFileSync('./package.json', { encoding: 'utf8' })
    const json = JSON.parse(jsonString)

    // Scripts and devDependencies don't make sense in the separate build
    // directory: scripts won't work and devDependency are related to
    // the root repo (the built package does not rely on jest, eslint...)
    delete json.scripts
    delete json.devDependencies

    fs.writeFileSync(`${path}/package.json`, JSON.stringify(json, null, 2))
}

module.exports = copyStatics
