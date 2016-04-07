module.exports = () => {
  return {
    files: [
      './client/src/app/*.js'
    ],
    tests: [
      './client/src/app/specs/*_spec.js'
    ],
    debug: true,
  }
}