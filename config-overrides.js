const { addWebpackAlias } = require('customize-cra');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = function override(config, env) {
  config.resolve.plugins = [
    ...(config.resolve.plugins || []),
    new TsconfigPathsPlugin({
      extensions: config.resolve.extensions,
    }),
  ];

  return addWebpackAlias({
    '@components': path.resolve(__dirname,'src/components'),
    '@assets':path.resolve(__dirname,'src/assets'),
    '@providers':path.resolve(__dirname,'src/providers'),
    '@~':path.resolve(__dirname,'/'),
    '@src':path.resolve(__dirname,'src'),
    '@hooks':path.resolve(__dirname,'src/hooks'),
    '@interfaces':path.resolve(__dirname,'src/common/interfaces')
  })(config, env);
};
