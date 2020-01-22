var path = require("path");
var webpack = require("webpack");
var TerserPlugin = require('terser-webpack-plugin');

var config = {
  entry: {
    "uirouter-redux": ["./core/index.ts"],
    "uirouter-redux.min": ["./core/index.ts"],
    "uirouter-redux-react": ["./react/index.ts"],
    "uirouter-redux-react.min": ["./react/index.ts"],
  },
  output: {
    path: path.resolve(__dirname, "_bundles"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "UIRouterRedux",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
      }),
    ],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /(node_modules|__tests__)/
      }
    ]
  },
  externals: {
    "react": { root: 'React', amd: 'react', commonjs2: 'react', commonjs: 'react' },
    "prop-types": { root: 'PropTypes', amd: 'prop-types', commonjs2: 'prop-types', commonjs: 'prop-types' },
    "@uirouter/core": { root: 'UIRouter', amd: '@uirouter/core', commonjs2: '@uirouter/core', commonjs: '@uirouter/core' },
    "@uirouter/react": { root: 'UIRouterReact', amd: '@uirouter/react', commonjs2: '@uirouter/react', commonjs: '@uirouter/react' }
  }
};

module.exports = config;
