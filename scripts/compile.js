const ts = require('typescript')
const fs = require('fs')
const path = require('path')
const process = require('process')

// https://github.com/Microsoft/TypeScript/issues/6387

function reportDiagnostics(diagnostics) {
    diagnostics.forEach(diagnostic => {
        let message = 'Error'
        if (diagnostic.file) {
            const where = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
            message += ' ' + diagnostic.file.fileName + ' ' + where.line + ', ' + where.character + 1
        }
        message += ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
        console.log(message)
    })
}

function readConfigFile(configFileName) {
    // Read config file
    const configFileText = fs.readFileSync(configFileName).toString()

    // Parse JSON, after removing comments. Just fancier JSON.parse
    const result = ts.parseConfigFileTextToJson(configFileName, configFileText)
    const configObject = result.config
    if (!configObject) {
        reportDiagnostics([result.error])
        process.exit(1)
    }

    // Extract config infromation
    const configParseResult = ts.parseJsonConfigFileContent(configObject, ts.sys, path.dirname(configFileName))
    if (configParseResult.errors.length > 0) {
        reportDiagnostics(configParseResult.errors)
        process.exit(1)
    }
    return configParseResult
}

function compile(buildPath, configFile = 'tsconfig.json') {
    // Extract configuration from config file
    const { fileNames, options } = readConfigFile(configFile)

    if (buildPath) options.outDir = buildPath

    // Compile
    const program = ts.createProgram(fileNames, options)
    const emitResult = program.emit()

    // Report errors
    reportDiagnostics(ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics))

    // Return code
    const exitCode = emitResult.emitSkipped ? 1 : 0
    process.exit(exitCode)
}

module.exports = compile
