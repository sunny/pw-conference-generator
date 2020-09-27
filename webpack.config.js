const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve("src/"),
  // Start here: /src/index.js
  entry: {
    index: [path.resolve(__dirname, "./src/index.js")],
  },
  // Put the bundled code here: /www/js/index.js
  output: {
    path: path.resolve(__dirname, "./www/js/"),
    filename: "[name].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "./www"),
    compress: true,
    port: 4080,
    index: "index.html",
    watchContentBase: true,
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        query: { cacheDirectory: true },
        loader: "babel-loader",
      },
      {
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader",
      },
    ],
  },
  context: __dirname,
  target: "web",
};
