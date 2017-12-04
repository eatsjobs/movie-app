const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = function(env){
  let PUBLIC_PATH = '/';
  const HYBRID_FOLDER = './www';
  let outputPath = './dist';
  // hybrid served from www
  if(env.APP_ENV === 'hybrid') {
    console.log('Hybrid build');
    outputPath = HYBRID_FOLDER;
    PUBLIC_PATH = '/';    
  }
  return merge(common, {
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: '[name].[hash:5].bundle.js',
      publicPath: PUBLIC_PATH
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Test',
        filename: 'index.html',
        APP_ENV: env.APP_ENV,
        template: './src/index.template.html',
        minify: {
          collapseWhitespace: true
        }
      }),
      // pass this in the global scope
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('production'),
        APP_ENV: JSON.stringify(env.APP_ENV),
      }),
      new workboxPlugin({
        globDirectory: outputPath,
        globPatterns: ['**/*.{html,js,png}'],
        swSrc: './src/sw.js',
        swDest: path.join(outputPath, 'sw.js')        
      }),
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        display: 'standalone',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        start_url: 'index.html?utm_source=homescreen',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
          {
            src: path.resolve('src/assets/icon.png'),
            size: '1024x1024' // you can also use the specifications pattern
          }
        ]
      })
    ]
  })
}