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
  ? [path.resolve(path.join(__dirname, './src/index.ts'))]
  : [
      'webpack/hot/poll?1000',
      path.resolve(path.join(__dirname, './src/index.ts'))
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
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
      },
      {
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
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
};
