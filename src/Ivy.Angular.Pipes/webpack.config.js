var webpack = require('webpack');
const TimeFixPlugin = require('time-fix-plugin');

const env = 'TEST';

module.exports = () => {

    return {

        entry: {
            'main': './index.ts',
            'test': './test/index.ts'
        },

        output: {
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        mode: 'development',

        devtool: 'source-map',

        resolve: {
            extensions: ['.ts', '.js']
        },

        module: {

            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        // Typescript Loaders
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: 'tsconfig.json'
                            },
                        },

                        // Secondary Loaders
                        //{ loader: 'angular-router-loader' },
                        { loader: 'angular2-template-loader' }
                    ],
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.css$/,
                    use:   'css-loader'
                },
            ]
        },

        plugins: [

            /*
             * Jasmine looks for the node process object for some reason
             */
            new webpack.DefinePlugin({
                'process': {
                    'env': {
                        'ENV': JSON.stringify(env),
                        'NODE_ENV': JSON.stringify(env)
                    },
                    'version': JSON.stringify('none')
                }
            }),


            /*
             * Typescript source files will not be included without this plugin
             */
            new webpack.SourceMapDevToolPlugin({
                filename: null, // if no value is provided the sourcemap is inlined
                test: /\.(ts|js)($|\?)/i // process .js and .ts files only
            }),


            new TimeFixPlugin()
        ],


        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            process: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false,
            fs: 'empty'
        }
    };
};