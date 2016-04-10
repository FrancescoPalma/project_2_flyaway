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
  devtool: "source-map",
}

module.exports = config;