let config = {
    testEnvironment : "jsdom",
    transform :  {
        '\\.[jt]sx?$': ['esbuild-jest', {
            jsxFactory : "h",
            jsxFragment : "Fragment"
        }],
    },
    rootDir: './tests/',
}

module.exports = config;