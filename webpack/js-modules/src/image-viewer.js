// 
// Image viewer
// 

// dependencies
// --------------
import '../styles/image-viewer.css';            // ES6 module direct file import (no execution)
import big from '../assets/big-size.jpg';       // file but no execution also 
import small from '../assets/small-size.jpg';   // file but no execution also 

// logic
// --------------
const   title = document.createElement('h1'),
        titleText = document.createTextNode('hello cruel world!'),
        image = document.createElement('img'),
        imageB = document.createElement('img');

title.className = 'title';
title.appendChild(titleText);

// image.src = 'http://lorempixel.com/400/400'; // get fake random generated image
image.className = 'image';
image.src = small; // will use data URL format (image was included on build.js)

imageB.className = 'image image-big';
imageB.src = big;



window.onload = () => {
    document.body.appendChild(title);
    console.log('parent node is = ', document.querySelector('.title').parentNode);
    title.parentNode.insertBefore(image, title);
    title.parentNode.insertBefore(imageB, title);
};
