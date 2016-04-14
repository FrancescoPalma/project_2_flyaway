var ExtractTextPlugin = require("extract-text-webpack-plugin");

config = {
  entry: './src/app.js',
  output: {
    filename: "bundle.js",
    path: "./build",
  },
  externals: {
    "jquery": "jQuery"
  },
  devServer: {
    contentBase: ".",
    inline: true,
    watch: true,
    hot: true,
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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
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