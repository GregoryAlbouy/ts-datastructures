const fs = require('fs')
const { execSync } = require('child_process')

function clearPackageDirectory(path) {
    if (
        !path ||
        path === '.' ||
        path === './' ||
        path === '*'
    )
        throw new Error('Missing or invalid build path')

    if (!fs.existsSync(path)) {
        execSync(`mkdir ${path}`)
        return
    }

    execSync(`rm -r ${path}/*`)
}

module.exports = clearPackageDirectory
