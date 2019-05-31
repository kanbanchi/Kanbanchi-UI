const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

module.exports = {
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(process.cwd(), './tsconfig.json'),
            tslint:path.resolve(process.cwd(), './tslint.json'),
            async: true,
        }),
        // system notifier for typescript checking
        new ForkTsCheckerNotifierWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.module\.(scss|sass)$/,
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../stories')],
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
                        loader: 'sass-loader'
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },

            //TS
            {
                test: /\.ts[x]?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/env", "@babel/react"],
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        }
                    }
                ]

            },

            {
                test: /\.(js|tsx)?$/,
                include: path.resolve(__dirname, '../stories/'),
                loaders: [require.resolve('@storybook/addon-storysource/loader')],
                enforce: 'pre',
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.sass', '.scss']
    }
};
