// 
// App
// 

// dependencies
// --------------

// npm modules

// components


// logic
// --------------
const   button = document.createElement('button');

button.innerText = 'click me!';
button.onclick = () => { // vanilla JS does DOES NOT use camel case for events
    /*-------------------
    using System ES6 JS global variable to import a file/module
    this is a async process, thus 'then' function should be called
    the parameter 'module' is the exported module from 'image-viewer
    the exported module has a method associated called 'default'
    that will execute and retrieve whatever was exported
    -------------------*/
    System.import('./image-viewer').then(   
        (module) => {
            console.log(module);                       
            module.default();               
        }                                   
    );  
        
};

window.onload = () => {
    document.body.appendChild(button);
};