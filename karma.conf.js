module.exports = function (config) {
  config.set({
    frameworks: ['browserify'],
    browsers: ['HeadlessChrome'],
    files: ['test.js'],
    preprocessors: {
      'test.js': ['browserify']
    },
    reporters: ['tape'],
    singleRun: true,
    customLaunchers: {
      HeadlessChrome: {
        base: 'Chrome',
        flags: ['--headless', '--disable-web-security']
      }
    }
  })
}
