const webpack = require("webpack");

module.exports = {
    entry: {
        script: "./scripts/script.js"
    },

    output: {
        path: "./build",
        filename: "[name].js"
    },

    watch: true,

    devtool: "source-map",

    resolve: {
        modulesDirectories: ["node_modules"],
        extentions: ["", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015", "stage-0"]
                }
            },
            {
                test:/\.css$/,
                loader: "style!css!autoprefixer?browsers=last 2 versions"
            },
            //for bootstrap
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        })
    ]
};