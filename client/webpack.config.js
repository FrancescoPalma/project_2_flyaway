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
}

module.exports = config;