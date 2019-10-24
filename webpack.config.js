
const path = require('path');
const  VueLoaderPlugin  = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    mode : 'development',
    devServer:{
        open:true,
        port:3000,
        contentBase:'src',
        hot:true
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test : /\.css$/,use:['style-loader','css-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader'},
            {test:/\.(ttf|eot|svg|woff|otf)$/,use:'url-loader'},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.js$/,use:'babel-loader',exclude:/(node_modules|bower_components)/},
            {test:/\.vue$/,use:'vue-loader'}
        ]

    },
    resolve:{
        alias: {
            // "vue$":"vue/dist/vue.js"
        }
    },

}