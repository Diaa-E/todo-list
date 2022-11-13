const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge"); //since webpack 5, merge is no longer default export

module.exports = merge(common, {
    mode: "development",
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                //execution order is from the end
                //1- load into js
                //2- inject into DOM
            },
        ],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        //resolves an absolute path to second argument
        //__dirname is the current directory name
    },
});