/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",

    // code coverage
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,js}',  // Adjust based on where your code is located
        '!src/**/*.d.ts',  // Exclude TypeScript declaration files
    ],
    coverageDirectory: 'coverage',  // Output folder for the coverage report
    coverageReporters: ['text', 'lcov'],  // Report types (can add 'html', 'json', etc.)
};