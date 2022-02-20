let config = {
    testEnvironment : "jsdom",
    transform :  {
        '\\.[jt]sx?$': 'esbuild-jest',
    },
    rootDir: './tests/',
}

module.exports = config;