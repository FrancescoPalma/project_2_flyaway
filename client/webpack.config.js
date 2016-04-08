var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var PATHS = {
  app: path.join(__dirname, 'src/app.js'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'src/stylesheets/main.sass')
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
  devServer: {
    contentBase: ".",
    inline: true,
    watch: true,
    hot: true,
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.sass$/,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract(
          "style-loader", "css-loader!sass-loader")
      },
      // fonts and svg
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      {
        // images
        test: /\.(ico|jpe?g|png|gif)$/,
        loader: "file"
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.css", {allChunks: true}),
  ],
}


module.exports = config;