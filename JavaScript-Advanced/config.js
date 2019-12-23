// Configuration file

/**
 * Gulp
 * => Paths
 * "in" and "out" keys are your input and output folders 
 * e.g: "in": "./src/js/*.babel.js", "out": "./dist/js"
 */
const paths = {
    'scss': {
        'in': './src/sass/**/*.scss',
        'out': './dist/styles/'
    },
    'js': {
        'entryFile': './src/js/*.js',
        'in': './src/js/**/*.js',
        'out': './dist/js/'
    }
}

exports.paths = paths
