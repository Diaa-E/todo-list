const HtmlWebpackPlugin = require('html-webpack-plugin');
//when moved to production the server breaks

module.exports = {

    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "images" ,
                    },
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/template.html" 
                //generate html with correct tags based on a template file
            }
        ),
    ]
};