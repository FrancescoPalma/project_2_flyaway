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
        loader: ExtractTextPlugin.extract(
          "style-loader", "css-loader!sass-loader")
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.css", {allChunks: true}),
  ],
}


module.exports = config;