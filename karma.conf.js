module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha','chai','riot','sinon-chrome','sinon'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-chai',
      'karma-riot',
      'karma-sinon',
      'karma-sinon-chrome',
      'babel-core'
    ],
    files: [
      '../../../node_modules/chai/chai.js',
      'views/*.tag',
      'tests/*.specs.js'
    ],
    preprocessors: {
      'views/*.tag': ['riot']
    },
    riotPreprocessor: {
      options: {
        type: 'es6'
      }
    },
    browsers: ['Chrome'],
    reporters: ['mocha'],
    // mochaReporter: {
    //   showDiff: true
    // },
    failOnEmptyTestSuite: false,
    singleRun: true 
  })
}