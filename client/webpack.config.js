config = {
  entry: ['./src/app.js'],
  output: {
    filename: "bundle.js",
    path: "./build/",
  },
  devtool: "source-map",
  loaders: [
  ]
}


module.exports = config;