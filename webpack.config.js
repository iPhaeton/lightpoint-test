const webpack = require("webpack");
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    entry: {
        script: "./scripts/script.js"
    },

    output: {
        path: "./build",
        filename: "[name].js"
    },

    watch: NODE_ENV === "development",

    devtool: NODE_ENV === "development" ? "source-map" : null,

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

if (NODE_ENV === "production") {
    module.exports.plugins.push (
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
};