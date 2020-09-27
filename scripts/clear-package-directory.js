const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const FORBIDDEN_PATHS = [
    path.resolve('./'),
    path.resolve('./', 'src'),
    path.resolve('./', 'test'),
]

function clearPackageDirectory(packageDir) {
    const dirPath = path.resolve(packageDir)

    if (!packageDir || FORBIDDEN_PATHS.includes(dirPath))
        throw new Error('Missing or invalid build path')

    if (!fs.existsSync(packageDir)) {
        execSync(`mkdir ${packageDir}`)
        return
    }

    execSync(`rm -r ${packageDir}/*`)
}

module.exports = clearPackageDirectory
