// config-overrides.js
const {
  addWebpackAlias,
  addWebpackModuleRule,
  babelInclude,
  fixBabelImports,
  override,
} = require('customize-cra');

const path = require('path');
const appDirectory = path.resolve(__dirname, './');

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};
// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: [
        'module:metro-react-native-babel-preset',
        '@babel/preset-react',
      ],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web', '@babel/plugin-syntax-jsx'],
    },
  },
};
module.exports = override(
  fixBabelImports('module-resolver', {
    alias: {
      '^react-native$': 'react-native-web',
    },
  }),
  addWebpackAlias({
    'react-native': 'react-native-web',
    // here you can add extra packages
    /*'react-native-maps': 'react-native-web-maps',*/
    'react-native-modal': 'modal-enhanced-react-native-web',
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
    //'@react-native-async-storage/async-storage': '@callstack/async-storage',
  }),
  addWebpackModuleRule(imageLoaderConfiguration, babelLoaderConfiguration),
  babelInclude([
    path.resolve('src'),
    path.resolve('app.json'),
    /* path.resolve('node_modules/react-native-super-grid'),*/

    // any react-native modules you need babel to compile
    // e.g.  path.resolve('./node_modules/react-native-vector-icons'),
  ]),
);
