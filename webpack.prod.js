const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, //move css to a sep file instead on DOM injection
                    "css-loader"
                    ],
                //execution order is from the end
                //1- load into js
                //2- inject into DOM
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), //this overrides the default js minifier, it needs to be added back manually
            new TerserPlugin(),
        ],
    },
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        //resolves an absolute path to second argument
        //__dirname is the current directory name
    },
});