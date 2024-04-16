const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { sassPlugin } = require('esbuild-sass-plugin');

const sharedConfig = {
    bundle: true,
    entryPoints: ["src/components/index.ts"],
    sourcemap: true,
    plugins: [nodeExternalsPlugin(), sassPlugin({type: "style"})],
    external: ["react", "react-dom"]
}

esbuild.build({
    ...sharedConfig,
    format: "esm",
    outfile: "dist/index.esm.js",
    target: ["esnext", "node12.22.0"]
});

esbuild.build({
    ...sharedConfig,
    format: "cjs",
    outfile: "dist/index.cjs.js",
    target: ["esnext", "node12.22.0"]
});