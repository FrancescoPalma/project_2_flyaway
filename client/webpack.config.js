var ExtractTextPlugin = require("extract-text-webpack-plugin");

config = {
  entry: './src/app.js',
  output: {
    filename: "bundle.js",
    path: "./build",
  },
  devServer: {
    contentBase: ".",
    inline: true,
    watch: true,
    hot: true,
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  resolveLoader: {
    packageMains: ['json-loader']
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract("style", "css", "sass")
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  sassLoader: {
    includePaths: './stylesheets/'
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
}

module.exports = config;