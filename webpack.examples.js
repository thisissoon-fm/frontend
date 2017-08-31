const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Webpack Constants
 */
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;

module.exports = {
  entry: path.join(__dirname, 'examples/entry.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.scss'],
    // An array of directory names to be resolved to the current directory
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: 'style-loader!raw-loader!sass-loader' },
      { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
      // /** Adding this to get watch to work for html files */
      { test: /\.html$/, loader: 'file-loader' },
    ]
  },
  plugins: [
    /**
      * Plugin: CopyWebpackPlugin
      * Description: Copy files and directories in webpack.
      *
      * Copies project static assets.
      *
      * See: https://www.npmjs.com/package/copy-webpack-plugin
      */
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      { from: '**/*.html', context: path.join(__dirname, 'examples') }
    ]),
  ],
  /**
   * Webpack Development Server configuration
   * Description: The webpack-dev-server is a little node.js Express server.
   * The server emits information about the compilation state to the client,
   * which reacts to those events.
   *
   * See: https://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    port: PORT,
    host: HOST,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

};
