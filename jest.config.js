module.exports = {
    coverageDirectory: './test/.coverage',
    coverageReporters: ['json', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
    preset: 'ts-jest',
    roots: ['./test'],
    setupFilesAfterEnv: ['./test/jest.setup.ts'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>/test/e2e'],
}
