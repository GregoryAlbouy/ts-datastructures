module.exports = {
    coverageDirectory: './test/.coverage',
    coverageReporters: ['json'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./test/jest.setup.ts'],
    testEnvironment: 'node',
}
