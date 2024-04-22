const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "www"),
    filename: "js/index.js",
  },
  devServer: {
    static: "www",
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({template: "src/index.html"}),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production"
  } else {
    config.mode = "development"
  }
  return config
};
