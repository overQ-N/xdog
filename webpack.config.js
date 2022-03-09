var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: {
    index: path.join(__dirname, 'index.js')
  },
  devServer: {
    static: path.join(__dirname, "./")
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'xdogSketch.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'xdogSketch',
    globalObject: 'this'
  },
  resolve: {
    fallback: {
      "stream": require.resolve('stream-browserify'),
      "path": require.resolve('path-browserify'),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve('assert'),
      "util": require.resolve('util'),
      'process': require.resolve('process')
    },
    // alias: {
    //   process: "process/browser"
    // }
  },
  // mode: 'development',
  mode: 'production',
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}