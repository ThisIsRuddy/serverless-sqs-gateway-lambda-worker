const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development': 'production',
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'lib/'),
      src: path.resolve(__dirname, 'src/'),
    }
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/)
  ]
};
