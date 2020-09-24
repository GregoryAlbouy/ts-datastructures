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
    const json = getPackageData()
    delete json.scripts

    fs.writeFileSync(`${path}/package.json`, JSON.stringify(json, null, 2))
}

function getPackageData() {
    const jsonString = fs.readFileSync('./package.json', { encoding: 'utf8' })
    return JSON.parse(jsonString)
}

module.exports = copyStatics
