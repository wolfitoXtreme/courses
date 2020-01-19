// 
// Server
// 

// project settings
// --------------
var project =           require('./package.json'),
    projectName =       project.name;


// dependencies
// --------------

// npm modules
const   express = require('express'),
        path = require('path');

// others

//  --


// Server configuration
// --------------
const   app =   express(),
        port =  process.env.PORT || 3050; // provider port or custom port


// Routs
// --------------

/*-------------------
Routes should be defined always before server configuration otherwise Express won't find them
-------------------*/
app.get('/hello', (req, res) => { res.send('Hello cruel world!'); }); // test


// APP settings
// --------------

// --

// 
// Server/rendering
//
if(process.env.NODE_ENV !== 'production') { // not in production env variable set, variable must set on server, see bellow
    
    // dependencies
    const   webpack =               require('webpack'),
            webpackMiddleware =     require('webpack-dev-middleware');

    const   webpackConfig =         require('./webpack.config.js');     // wp configuration

    app.use(webpackMiddleware(
        webpack(webpackConfig)
    )); // using middleware to intercept requests
} 
else { // in production
    // run with $ NODE_ENV=production node server.js

    app.use(express.static('dist')); // Express makes static content available

    /*-------------------
    specific to ReactRouter work with get requests
    -------------------*/
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}




// Server listening
app.listen(port, () => {
    console.log('<<' + projectName.toUpperCase() + '>> server is started!!');
});