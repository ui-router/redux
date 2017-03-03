var path = require("path");
var webpack = require("webpack");

var config = {
  entry: {
    "ui-router-redux": ["./src/index.ts"],
    "ui-router-redux.min": ["./src/index.ts"]
  },
  output: {
    path: path.resolve(__dirname, "_bundles"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "UIRouterRedux",
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "ui-router-redux": "/Volumes/FILES/github/elboman/ui-router-redux/lib"
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      include: /\.min\.js$/,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /(node_modules|__tests__)/
      }
    ]
  }
};

module.exports = config;