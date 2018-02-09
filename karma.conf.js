const webpack = require('webpack')
const path = require('path')

const OUTPUT_DIR = path.resolve(__dirname, 'coverage')
const SOURCE_DIR = path.resolve(__dirname, 'src')

module.exports = function (config) {
  config.set({
    basePath: SOURCE_DIR,
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    logLevel: 'info',
    captureTime: 15000,
    logLevel: config.LOG_INFO,
    browsers: [ 'Chrome' ],
    frameworks: [ 'mocha' ],
    files: [ 'test/**/*.spec.js' ],
    plugins: [
        'karma-webpack',
        'karma-mocha',
        'karma-chrome-launcher',
        'karma-chai',
        'karma-sinon',
        'karma-eslint',
        'karma-sourcemap-loader',
        'karma-coverage',
        'karma-mocha-reporter'
      ],
    preprocessors: {
      '**/*.spec.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha', 'coverage' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' },
          {
            test: /\.js$/,
            include: path.resolve(SOURCE_DIR, 'app'),
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post'
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
       type: 'html',
       dir: OUTPUT_DIR
      }
  });
};