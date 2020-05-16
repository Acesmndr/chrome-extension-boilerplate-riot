const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { registerPreprocessor } = require('@riotjs/compiler');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const riotScssPreprocessor = require('./riot-scss-preprocessor.config');

const ENV = process.env.NODE_ENV;

registerPreprocessor('css', 'scss', riotScssPreprocessor);

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

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: './src/background/images/',
      to: 'img/',
    }, {
      from: './src/popup/images/',
      to: 'img/',
    }, {
      from: './src/popup/index.html',
      to: '../popup.html',
    }, {
      from: './src/background/index.html',
      to: '../background.html',
    }, {
      from: './src/manifest.json',
      transform: (content) => {
        const manifestJSON = JSON.parse(content.toString());
        return JSON.stringify(Object.assign({}, manifestJSON, { version: packageJSON.version }), null, ' ');
      },
      to: '../',
    }
  ]
});
const cleanPlugin = new CleanWebpackPlugin({
  dry: false,
  verbose: true,
  cleanOnceBeforeBuildPatterns: ['../../dist', '../../production', '../../staging', '../../build', '../../development'],
  dangerouslyAllowCleanPatternsOutsideProject: true,
});
const defineUrlPlugin = new webpack.DefinePlugin({ BASE_URL: JSON.stringify(baseUrl()) });
const terserPlugin = new TerserPlugin({ 
  terserOptions: {
    comments: false,
    compress: { drop_console: ENV === 'production' },
    minimize: true,
    exclude: /\.spec\.js$/,
  },
});

module.exports = [{
  entry: {
    'background.min': [`${__dirname}/src/background/index.js`],
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
    minimizer: [terserPlugin],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/${ENV}/assets/`,
  },
}, {
  entry: {
    'interface.min': ['./src/popup/index.js'].concat(glob.sync('./src/popup/**/*.riot')),
  },
  mode: (ENV === 'production') ? 'production' : 'none',
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [{
          loader: '@riotjs/webpack-loader',
          options: {
            hot: true,
            css: 'scss',
          }
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] 
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [defineUrlPlugin],
  optimization: {
    minimizer: [terserPlugin],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/${ENV}/assets/`,
  },
}];

