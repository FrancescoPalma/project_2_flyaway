config = {
  entry: ['./src/app.js', 'file?name=index.html!jade-html!./views/index.jade'],
  output: {
    filename: "bundle.js",
    path: "./build/",
  },
  devtool: "source-map",
  loaders: [
    { test: /\.jade$/,   loader: "jade-loader?self" },
  ]
}


module.exports = config;