const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';
const plugins = [];

if (!isProduction) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const entry = isProduction
  ? [path.resolve(path.join(__dirname, './src/index.js'))]
  : [
      'webpack/hot/poll?1000',
      path.resolve(path.join(__dirname, './src/index.js'))
    ];

module.exports = {
  entry: entry,
  mode: nodeEnv || 'development',
  plugins: plugins,
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'server.bundle.js'
  },
  target: 'node',
  externals: nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  }),
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};
