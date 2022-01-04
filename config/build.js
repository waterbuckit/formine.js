const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');

esbuild.build({
    entryPoints: ['./src/builds/cdn.js'],
    bundle: true,
    minify : true,
    sourcemap : true,
    watch : process.argv[2] && true, 
    jsxFactory : "h",
    jsxFragment : "Fragment",
    outfile: './dist/cdn.js',
    plugins: [
      alias({
        "react": require.resolve("preact/compat"),
        "react-dom/test-utils": require.resolve("preact/test-utils"),
        "react-dom": require.resolve("preact/compat"),
        "react/jsx-runtime": require.resolve("preact/jsx-runtime"),
      }),
    ],
  }).catch(err => process.exit(1));