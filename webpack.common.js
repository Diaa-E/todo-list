const HtmlWebpackPlugin = require('html-webpack-plugin');
//when moved to production the server breaks

module.exports = {

    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][hash][ext][query]'
                }
            },
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