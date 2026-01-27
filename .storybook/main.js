// module.exports = {
//   "stories": [
//     "../src/**/*.stories.mdx",
//     "../src/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   "addons": [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions"
//   ],
//   "framework": "@storybook/react",
//   "core": {
//     "builder": "@storybook/builder-webpack5"
//   }
// }
const custom = require('./webpack.config.js');

module.exports = {
  stories: [
    '../stories/**/*.stories.(js|tsx)'
  ],

  staticDirs: ['../public'],

  "addons": [
    "@storybook/addon-storysource",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

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

  docs: {
    // autodocs: true
  }
};