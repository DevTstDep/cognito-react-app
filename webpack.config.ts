import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    //    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    //    watch: true,
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }
}

export default config;