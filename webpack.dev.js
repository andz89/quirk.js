const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index_dev.js"),
  },

  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "[name].js",
    // filename:'[name].[contenthash].js',

    clean: true,
    assetModuleFilename: "[name][ext]",
    // publicPath: "dist/",
  },
  // devtool:'source-map',
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,

        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      MODE: JSON.stringify("development"),
    }),

    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      // filename: "[name].[contenthash].css"
      filename: "[name].css",
    }),
  ],
};
