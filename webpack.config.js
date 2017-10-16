const webpack = require('webpack');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV;
const baseUrl = () => {
  switch (ENV) {
    case 'production':
      return 'https://acesmndr.com';
    case 'staging':
    default:
      return 'https://acesmndr.staging.com';
  }
};
const packageJSON = require('./package.json');

const copyPlugin = new CopyWebpackPlugin([{
  from: './src/assets/img/',
  to: 'img/',
}, {
  from: './src/assets/css/',
  to: 'css/',
}, {
  from: './src/popup.html',
  to: '../',
}, {
  from: './src/background.html',
  to: '../',
}, {
  from: './src/manifest.json',
  transform: (content) => {
    const manifestJSON = JSON.parse(content.toString());
    return JSON.stringify(Object.assign({}, manifestJSON, { version: packageJSON.version }), null, ' ');
  },
  to: '../',
}]);
const cleanPlugin = new CleanWebpackPlugin(['dist', 'production', 'staging', 'build', 'development'], {
  root: __dirname,
  verbose: false,
});
const defineUrlPlugin = new webpack.DefinePlugin({ BASE_URL: JSON.stringify(baseUrl()) });
const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({ comments: false, compress: { drop_console: ENV === 'production' }, minimize: true });

module.exports = [{
  entry: {
    background: [`${__dirname}/src/assets/model/background.js`],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: { presets: ['es2015', 'stage-0'] },
    }],
  },
  plugins: (ENV === 'production') ? [cleanPlugin, copyPlugin, defineUrlPlugin, uglifyPlugin] : [cleanPlugin, copyPlugin, defineUrlPlugin],
  output: {
    filename: '[name].js',
    path: `${__dirname}/${ENV}/assets/`,
  },
}, {
  entry: {
    'bundle.min': ['./src/assets/presenter/messaging_mixin.js'].concat(glob.sync('./views/*.tag'), ['./src/assets/presenter/presenter_helper.js', './src/assets/presenter/main.js']),
  },
  resolveLoader: {
    modules: ['node_modules', `${__dirname}/loaders`],
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'riot-loader', enforce: 'pre',
      },
      {
        test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader', options: { presets: ['es2015'] },
      },
    ],
  },
  plugins: (ENV === 'production') ? [defineUrlPlugin, uglifyPlugin] : [defineUrlPlugin],
  output: {
    filename: '[name].js',
    path: `${__dirname}/${ENV}/assets/`,
  },
}];

