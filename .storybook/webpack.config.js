const path = require('path'),
    imports = {
        data: `
            @import 'material-colors-map';
            @import 'mixins';
            @import 'variables';
            @import 'helpers';`,
        includePaths: [
            path.resolve(__dirname, '../src/assets/sass/partials')
        ]
    };


const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = (storybookBaseConfig, configType) => {
    const baseSassModuleRule = storybookBaseConfig.module.rules.find(item => item.test.toString() === sassModuleRegex.toString());
    const sassModuleRuleIndex = storybookBaseConfig.module.rules.indexOf(baseSassModuleRule);
    storybookBaseConfig.module.rules.splice(sassModuleRuleIndex, 1);
    storybookBaseConfig.module.rules.push({
        test: sassModuleRegex,
        include: path.resolve(__dirname, '../src/ui'),
        use: [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    sourceMap: true,
                    localIdentName: '[local]',
                    minimize: true
                }
            },
            {
                loader: 'sass-loader',
                options: imports
            }
        ]
    });
    return storybookBaseConfig;
};

