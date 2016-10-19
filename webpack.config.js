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

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015", "stage-0"]
                }
            }
        ]
    }
};