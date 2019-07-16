const webpack = require('webpack');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.NODE_ENV;
const baseUrl = () => {
  switch (ENV) {
    case 'production':
      return 'https://acesmndr.com';
    case 'development':
    default:
      return 'https://acesmndr.staging.com';
  }
};
const packageJSON = require('./package.json');

const copyPlugin = new CopyWebpackPlugin([{
  from: './src/assets/img/',
  to: 'img/',
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
const cleanPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ['dist', 'production', 'staging', 'build', 'development'],
  root: __dirname,
  verbose: false,
});
const defineUrlPlugin = new webpack.DefinePlugin({ BASE_URL: JSON.stringify(baseUrl()) });
const uglifyPlugin = new UglifyJsPlugin({ 
  uglifyOptions: {
    comments: false, compress: { drop_console: ENV === 'production' }, minimize: true
  },
});

module.exports = [{
  entry: {
    background: [`${__dirname}/src/assets/background.js`],
  },
  mode: (ENV === 'production') ? 'production' : 'none',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: { presets: ['@babel/preset-env'] },
    }],
  },
  plugins: [cleanPlugin, copyPlugin, defineUrlPlugin],
  optimization: {
    minimizer: [uglifyPlugin],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/${ENV}/assets/`,
  },
}, {
  entry: {
    'bundle.min': ['./views/presenters/mixins/messaging-mixin.js'].concat(glob.sync('./views/*.tag'), ['./views/presenters/controllers/main.js']),
  },
  mode: (ENV === 'production') ? 'production' : 'none',
  resolve: {
    alias: {
      riot: 'riot/riot.csp.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'riot-tag-loader', enforce: 'pre',
      },
      {
        test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader', options: { presets: ['@babel/preset-env'] },
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      }
    ],
  },
  plugins: [defineUrlPlugin],
  optimization: {
    minimizer: [uglifyPlugin],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/${ENV}/assets/`,
  },
}];

