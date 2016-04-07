module.exports = () => {
  return {
    files: [
      'client/src/models/*.js'
    ],
    tests: [
      'client/src/specs/*.js'
    ],
    debug: true,
    env: {
      type: 'node',
    }
  }
}