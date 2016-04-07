config = {
  entry: ['./src/app.js', 'file?name=index.html!jade-html!./src/index.jade'],
  output: {
    filename: "bundle.js",
    path: "./build/",
  },
  devtool: "source-map",
}

module.exports = config;