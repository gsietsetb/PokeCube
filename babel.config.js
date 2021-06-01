module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    [
      '@babel/plugin-syntax-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
