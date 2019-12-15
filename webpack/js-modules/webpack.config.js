// 
// Webpack
// 

// dependencies
// --------------
const   path = require('path'),                                     // nodeJS helper to get absolute paths
        ExtractTextPlugin = require('extract-text-webpack-plugin'); // Extract text plugin   

// configuration
// --------------

/*-------------------
To run webpack within the command line:
$npm run build
The package.json file should have this script defined
  "scripts": {
    "build": "webpack"
  },
-------------------*/

const config = {
    /*-------------------
    First file that executes inside the application
    Start of the module building process
    -------------------*/
    entry: './src/index.js', // 'relative' path reference
    /*-------------------
    Where to save the output
    -------------------*/
    output: {
        /*-------------------
        '__dirname' points to the current working directory,
        'build' will be the destination folder inside that working directory
        -------------------*/
        path: path.resolve(__dirname, 'build'), // 'absolute' path reference using nodeJS 'path 'helper function
        publicPath: 'build/',                   // sets public folder
        filename: 'bundle.js'                   // standard output file name
    },
    /*-------------------
    Loaders (rules) handle the preprocessing of files before generate the bundle,
    module (rule) system defines the loaders to be pre-process files.
    Each module needs an external configuration file. ex: 'babel' uses '.babalrc'
    -------------------*/
    module: {
        // a rule per loader, and one object per loader
        rules: [
            // babel (transpiler)
            /*-------------------
            Dependencies:
            "@babel/core": "^7.4.0"
            "@babel/preset-env": "^7.4.2"
            "babel-loader": "^8.0.5"
            -------------------*/
            {   
                use: 'babel-loader',    // loader 
                test: /\.js$/           // regex expression to find files to apply pre-process
            },
           
            // styles (generate embeded styles)
            /*-------------------
            Dependencies:
            "css-loader": "^2.1.1"
            "style-loader": "^0.23.1"
            -------------------*/
            // {
            //     use: ['style-loader', 'css-loader'], // loaders are applied from right to left
            //     test: /\.css$/
            // }

            // styles (generate styles file)
            /*-------------------
            Dependencies:
            "extract-text-webpack-plugin": "^2.0.0-beta.4"
            "css-loader": "^2.1.1"
            -------------------*/
            {
                loader: ExtractTextPlugin.extract({ // legacy of loader 'use', because of the plug-in being used
                    loader: 'css-loader'
                }),
                test: /\.css$/
            },

            // images (compress images)
            /*-------------------
            Dependencies:
            "image-webpack-loader": "^4.6.0"
            "url-loader": "^1.1.2"
            "file-loader": "^3.0.1"
            -------------------*/
            {
                use: [
                    // loader with configuration object
                    {  
                        loader: 'url-loader',
                        options: { limit: 40000}    // limit to include image within the bundle
                                                    // otherwise create a separated file 
                    },
                    'image-webpack-loader'
                ],
                test: /\.(jpe?g|png|gif|svg)$/
            }
        ]
    },
    /*-------------------
    Plugins configuration
    -------------------*/
    plugins: [
        new ExtractTextPlugin('style.css') // file name for the styles
    ]
};



module.exports = config;