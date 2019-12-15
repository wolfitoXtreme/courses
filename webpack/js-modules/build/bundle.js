/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_image_viewer_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_image_viewer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_image_viewer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_big_size_jpg__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_big_size_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_big_size_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_small_size_jpg__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_small_size_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__assets_small_size_jpg__);
// 
// Image viewer
// 
// dependencies
// --------------
 // ES6 module direct file import (no execution)

 // file but no execution also 

 // file but no execution also 
// logic
// --------------

var title = document.createElement('h1'),
    titleText = document.createTextNode('hello cruel world!'),
    image = document.createElement('img'),
    imageB = document.createElement('img');
title.className = 'title';
title.appendChild(titleText); // image.src = 'http://lorempixel.com/400/400'; // get fake random generated image

image.className = 'image';
image.src = __WEBPACK_IMPORTED_MODULE_2__assets_small_size_jpg___default.a; // will use data URL format (image was included on build.js)

imageB.className = 'image image-big';
imageB.src = __WEBPACK_IMPORTED_MODULE_1__assets_big_size_jpg___default.a;

window.onload = function () {
  document.body.appendChild(title);
  console.log(document.querySelector('.title').parentNode);
  title.parentNode.insertBefore(image, title);
  title.parentNode.insertBefore(imageB, title);
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// 
// Sum
// 
// dependencies
// --------------
// npm modules
// logic
// --------------
var sum = function sum(a, b) {
  return a + b;
}; // export
// module.exports = sum;    // ES5 module syntax 'CommonJS modules'


/* harmony default export */ exports["a"] = sum; //ES6 module syntax

/***/ },
/* 2 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a25ce32e051652f9a3016da95f538e6e.jpg";

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sum__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_viewer__ = __webpack_require__(0);
// 
// App
// 
// dependencies
// --------------
// npm modules
// components
// const sum = require('./sum');    // ES5 module syntax 'CommonJS modules'
 // ES6 module syntax

 // ES6 module direct file import (mo execution)
// logic
// --------------

var total = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sum__["a" /* default */])(10, 5);
console.log(total);

/***/ }
/******/ ]);