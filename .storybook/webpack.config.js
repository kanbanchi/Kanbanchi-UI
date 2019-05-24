const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.module\.(scss|sass)$/,
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
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        }
                    }
                ]

            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.sass', '.scss']
    }
};