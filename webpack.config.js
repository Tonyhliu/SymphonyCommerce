const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./App.jsx",

  output: {
    path: "javascripts",
    filename: "bundle.js",
  },

  node: {
    fs: "empty"
  },

  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
