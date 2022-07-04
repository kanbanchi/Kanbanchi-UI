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
    '../stories/**/*.(js|tsx)'
  ],
  "addons": [
    "@storybook/addon-storysource"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
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
};