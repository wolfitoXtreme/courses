// 
// Webpack
// 

// dependencies
// --------------
var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

// configuration
// --------------

/*-------------------
To run webpack within the command line:
$npm run build

To run development server:
$npm run serve

To delete build files
$ npm run clean

Will build the whole project, and then listen for changes (http://localhost:8080)...

dependencies:
"rimraf": "^2.6.3", // deleting files
"webpack-dev-server": "^2.2.0-rc.0" // development server

The package.json file should have these scripts defined
  "scripts": {
    "clean": "rimraf dist", // tell rimraf  to delete files within dist folder
    "build": "npm run clean && webpack" // will delete files, and then build again
    "serve": "webpack-dev-server" // to serve/watch for file changes. 
  },
-------------------*/

// assign all dependencies for splitting
const vendorLibs = [
    'faker',
    'lodash',
    'react',
    'react-dom',
    'react-input-range',
    'react-redux',
    'react-router',
    'redux',
    'redux-form',
    'redux-thunk'
];

module.exports = {
    entry: {                        // 'splitting' path references into several files
        bundle: './src/index.js',   // compiles to bundle.js (standard output file name)
        vendor: vendorLibs          // assigned name to modules dependencies included,
                                    // will compile as vendor.js
    },
    output: {
        /*-------------------
        'absolute' path reference using nodeJS 'path 'helper function
        -------------------*/
        path: path.join(__dirname, 'dist'),
        /*-------------------
        will out put [name].[chunkhash].js corresponding with 'entry' object
        ex. bundle.10fb1758b8d8b94ad0c9.js, where 'chunkhash' is a random generated number
        this is done to avoid caching files by the browser.
        -------------------*/
        filename: '[name].[chunkhash].js' 
    },

    module: {
        rules: [
            // babel (transpiler)
            /*-------------------
            Dependencies:
            "babel-core": "^6.17.0"
            "babel-loader": "^6.2.0"
            "babel-preset-env": "^1.1.4"
            "babel-preset-react": "^6.16.0" ??
            -------------------*/
            {
                use: 'babel-loader',
                test: /\.js$/,              // regex to find files
                exclude: /node_modules/     // excluding node  modules
            },

            // styles (generate embeded styles)
            /*-------------------
            "css-loader": "^0.26.1",
            "style-loader": "^0.13.1",
            -------------------*/
            {
                use: ['style-loader', 'css-loader'], // loaders are applied from right to left
                test: /\.css$/                       // regex to find files
            }
        ]
    },

    /*-------------------
    Plugins configuration
    -------------------*/
    plugins: [
        // CommonsChunkPlugin
        /*-------------------
        checks for common modules and removes duplicates 
        and add leaves them only inside 'vendor' file.

        Applying the 'hash' (chunkhash) will ultimately make that only files/bundles that
        were changed will change the 'hash', therefore the file name
        thus these files won't be cached 
        -------------------*/
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendor'
            names: [
                'vendor',   // vendor.[chunkhash].js file name
                'manifest'  // will tell the browser whether or not the vendor.[chunkhash].js file changed (cache)
            ]
        }),

        // HtmlWebpackPlugin
        /*-------------------
        handles the JS injection on the HTML file
        -------------------*/
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        // Deployment
        /*-------------------
        
        -------------------*/
        new webpack.DefinePlugin({
            /*-------------------
            The package.json file should have this definitions 
            * 'cross-env NODE_ENV=production', sets the correct Node environment variable for React (server)
                dependencies:
                "cross-env": "^5.2.0" (to correctly change the ENV variable)
            * -p flag, compress bundle files
            
              "scripts": {
                "clean": "rimraf dist",
                "build": "cross-env NODE_ENV=production npm run clean && webpack -p",
                "serve": "webpack-dev-server"
              },
            -------------------*/

            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
