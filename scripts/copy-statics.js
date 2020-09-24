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

    delete json.scripts
    fs.writeFileSync(`${path}/package.json`, JSON.stringify(json, null, 2))
}

module.exports = copyStatics
