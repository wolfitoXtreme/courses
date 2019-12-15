// ---------------------
// compiler
// ---------------------

console.log(
    '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 
    'compiler',
    '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n'
);

console.log('\n-------------\n', 'compiler options', '\n-------------\n');

/* -------------------
// options

"compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": false,     // warns when no value is defined, thus allowing any type of variable.
    "sourceMap": true,          // creates access to file.ts within browser sources. 
    "strictNullChecks": true,   // check for null
    "noEmitOnError": true,      // does not compile if errors
    "noUnusedParameters": true  // show warning for missing parameters
},

------------------- */

// compiling errors
let vehicle:string = "car";
let quantity:number = 20;

// vehicle = 20; // TS shows error. won't compile if 'noEmitOnError' is configured

// function controlMe(isTrue: boolean, somethingElse: boolean) { // TS shows error. somethingElse not used
    function controlMe(isTrue: boolean) {
    let result: number;
    let anotherResult: number = 20;
    if(isTrue) {
        result = 12;
    }
    // return result;  // TS shows error. won't compile if 'strictNullChecks' is configured
}