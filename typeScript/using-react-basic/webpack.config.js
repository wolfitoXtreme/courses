module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: './bundle.js'
    },

    // specify map creation
    devtool: 'source-map',

    // Configure modules/file types to be resolved
    resolve: {
        extensions: ['*','.ts','.tsx','.js']
    },

    // modules
    module: {
        rules: [
            // TypeScript
            /* 
            test all TS files, an compile them with 'ts-loader'
            */
            { 
                test: /\.tsx?$/,            // regex to accept .ts and .tsx files 
                use: 'ts-loader',           // handled by ts-loader
                exclude: '/node_modules/'
            }
        ]
    }
};