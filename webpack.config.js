const webpack = require('webpack');
const { registerPreprocessor } = require('@riotjs/compiler');
const sass = require('node-sass');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

registerPreprocessor('css', 'scss', function (code, { options }) {
  const { file } = options
  console.log(options);

  console.log('Compile the sass code in', file)

  const { css } = sass.renderSync({
    data: code
  })

  console.log(css.toString());

  return {
    code: css.toString(),
    map: null
  }
})

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
    'interface.min': ['./src/popup/index.js'].concat(glob.sync('./src/popup/**/*.riot')),
    // 'bundle.min': ['./views/presenters/mixins/messaging-mixin.js'].concat(glob.sync('./views/*.tag'), ['./views/presenters/controllers/main.js']),
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
    minimizer: [uglifyPlugin],
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/${ENV}/assets/`,
  },
}];

