'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

dotenv.load();

let plugins = [
  new ExtractTextPlugin('bundle.css'),
  new HTMLPlugin({ template: `${__dirname}/app/index.html` }),
  new webpack.DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
    __DEBUG__: JSON.stringify(!production)
  })
];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      },
    }),
    new CleanPlugin()
  ]);
}

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  devtool: production ? false : 'eval',
  plugins,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(woff|ttf|svg|eot).*/,
        loader: 'url?limit=1000&name=font/[hash].[ext]'
      },
      {
        test: /\.(jpg|jpeg|svg|bmp|tiff|gif|png)$/,
        loader: 'url?limit=1000&name=image/[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
      },
      {
        test: /\.mp4$/,
        loader: 'file',
        include: path.join(`${__dirname}/assets/video`)
      }
      // NOTE: Temp in case of video upload with ng-file-upload
    ]
  }
};
