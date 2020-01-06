// export let keyValue = 6000;
// export function myTest() {
// console.log('function test...');

// grouping the exports, same as above
let keyValue = 1000;
function myTest() {
    keyValue = 1001;
    console.log('Function test...');
}

let ab = 'Some text...';

let anotherKeyValue = 2000;
function anotherFunc() {
    anotherKeyValue = 2001;
    console.log('Another function test...');
}

export {keyValue, myTest};
export default ab; // default export
export {anotherKeyValue, anotherFunc};