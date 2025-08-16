const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// Load environment variables
require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'ObjectWise'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_GOOGLE_VISION_API_KEY': JSON.stringify(process.env.REACT_APP_GOOGLE_VISION_API_KEY)
      }
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets'
          }
        },
        {
          urlPattern: /^https:\/\/vision\.googleapis\.com/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'vision-api'
          }
        }
      ]
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};