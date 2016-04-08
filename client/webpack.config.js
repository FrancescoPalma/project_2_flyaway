var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var PATHS = {
  app: path.join(__dirname, 'src/app.js'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'src/stylesheets/main.scss')
};

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

config = {
  entry: {
    path: PATHS.app,
  },
  output: {
    filename: "bundle.js",
    path: PATHS.build,
  },
  devtool: "source-map",
  loaders: [
    {
      test: /\.scss$/,
      loader: "style!css!sass"
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css!sass")
     },
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  devServer: {
    contentBase: ".",
    inline: true,
    watch: true,
    hot: true,
  }
}


module.exports = config;