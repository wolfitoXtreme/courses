// 
// Image viewer
// 

// dependencies
// --------------
import '../styles/image-viewer.css';            // ES6 module direct file import (no execution)
import small from '../assets/small-size.jpg';   // file but no execution also 

// logic
// --------------
const   title = document.createElement('h1'),
        titleText = document.createTextNode('hello cruel world!'),
        image = document.createElement('img');

image.className = 'image';
image.src = small; // will use data URL format (image was included on build.js)

// export, passing all logic to the export module function
export default () => {

    title.className = 'title';
    title.appendChild(titleText);

    // window.onload = () => {
        document.body.appendChild(title);
        console.log(document.querySelector('.title').parentNode);
        title.parentNode.insertBefore(image, title);
    // };
};


