const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const WorkboxPlugin = require("workbox-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index_prod.js"),
  },

  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "[name].js",
    // filename:'[name].[contenthash].js',
    clean: true,
    assetModuleFilename: "[name][ext]",
    publicPath: "dist/",
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
      MODE: JSON.stringify("production"),
    }),
    // new CopyWebpackPlugin({
    //     patterns: [
    //       { from: 'public/dist/index.html', to: '../../views/pages/canvas-test.ejs',
    //       transform(content, path) {
    //         const bundlePath = 'dist';
    //         const cssPath = 'dist';
    //         let html = content.toString();
    //         html = html.replace(/(<script[^>]+src=")([^"]+)(\/?)([a-z0-9]*\.js[^>]*>)/g, `$1${bundlePath}/$2$3$4`);
    //         html = html.replace(/(<link[^>]+href=")([^"]+)(\/?)([a-z0-9]*\.css[^>]*>)/g, `$1${cssPath}/$2$3$4`);
    //         return Buffer.from(html);
    //       },

    //     }
    //     ]
    //   }),
    // new WorkboxPlugin.GenerateSW({
    //   swDest: "../service-worker.js",

    //   runtimeCaching: [
    //     {
    //       urlPattern: "/canvas",
    //       handler: "StaleWhileRevalidate",
    //       options: {
    //         cacheName: "quirk",
    //         expiration: {
    //           maxEntries: 50,
    //           maxAgeSeconds: 7 * 24 * 60 * 60,
    //         },
    //       },
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "../../views/pages/canvas.ejs",
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      // filename: "[name].[contenthash].css"
      filename: "[name].css",
    }),
  ],
};
