// ---------------------
//  circle Math namespace
// ---------------------
// 
// functions
// 
var MyMath;
(function (MyMath) {
    let Circle;
    (function (Circle) {
        const Pi = 3.1416;
        function calculateCircumference(diameter) {
            return diameter * Pi;
        }
        Circle.calculateCircumference = calculateCircumference;
        ;
    })(Circle = MyMath.Circle || (MyMath.Circle = {}));
})(MyMath || (MyMath = {}));
// ---------------------
//  rectangle Math namespace
// ---------------------
// 
// functions
// 
var MyMath;
(function (MyMath) {
    function calculateRectangle(width, length) {
        return width * length;
    }
    MyMath.calculateRectangle = calculateRectangle;
    ;
})(MyMath || (MyMath = {}));
// ---------------------
//  Namespaces
// ---------------------
// 
// importing namespace
// 
// import from ... would be ES6 syntax
//  TypeScript imports name spaces. Order is relevant
/// <reference path='circleMath.ts' />
/// <reference path='rectangleMath.ts' />
var circleMath = MyMath.Circle; // TypeScript way to import and name a nested namespace
/*
had to set tsconfig.json compilerOptions
    "module" : "none"
    "outFile": "app.js" // avoid generating other files
in order to watch all files but only compile 'app.js' otherwise watch will not work
*/
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Namespaces', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// Namespaces
// 
console.log('\n-------------\n', 'Namespaces', '\n-------------\n');
// namespace MyMath { // defining namespace locally
//     
// };
// console.log(calculateRectangle(10, 20));             // TS shows error, as function is nopt present in the global namespace
console.log(MyMath.calculateRectangle(10, 30)); // TS shows error if not namespace is imported
console.log(MyMath.Circle.calculateCircumference(1)); // TS shows error if not namespace is imported
console.log(circleMath.calculateCircumference(2)); // same as above using imported namespace
const Pi = 8.4444; // will be part of the global namespace while not affecting the 'MyMath' namespace
// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');
//# sourceMappingURL=app.js.map