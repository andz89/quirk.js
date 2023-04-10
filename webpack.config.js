const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode: 'development',
    entry:{
        bundle: path.resolve(__dirname, 'src/index.js')
    },

    output:{
       path: path.resolve(__dirname, 'public/dist'),
    filename:'[name][contenthash].js',
    clean:true,
    assetModuleFilename: '[name][ext]',
    publicPath: 'dist/'
},
// devtool:'source-map',
devServer:{
    static:{
        directory:path.resolve(__dirname, 'src')
    },
    port:3000,
    open: true,
    hot:true,
    compress: true,
    historyApiFallback: true,
  
},
module:{
    rules:[
        {
            test: /\.scss$/,

            use:[
                MiniCssExtractPlugin.loader, 
                // 'style-loader',
                'css-loader',
                'sass-loader'
            ],
        },
        {
            test:/\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
                options:{
                    presets:['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          
        
    ]
},
plugins:[
    new HtmlWebpackPlugin({
        title:'Webpack App',
        filename: '../../views/pages/canvas-test.ejs',
        template:'./src/index.html',
        template_json : '<%-template_json%>',
        purchased_id : '<%-purchased_id%>',
        template_id : '<%-template_id%>',
        canvas_image : '<%-canvas_image%>',
        template_name : '<%-template_name%>',
        list : '<%-list%>',
        user_role : '<%-user_role%>',
       
    }),
    new  MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
      }),
]
   
 
}