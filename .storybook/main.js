const custom = require('./webpack.config.js');

module.exports = {
  stories: [
    '../stories/**/*.(js|tsx)'
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        rules: custom.module.rules,
      },
      resolve: {
        ...config.resolve,
        ...custom.resolve,
      }
    };
  },
};