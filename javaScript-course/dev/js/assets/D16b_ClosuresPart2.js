// D16b_ClosuresPart2

function buildFunctions() {
    var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(
            function() {
                var j = i;
                // console.log is not yet invoked 
                // thus when run will get 3 always as value
                console.log(
                    'outer variable environment reference "i" -> ' + i + '\n' +
                    'outer variable environment reference "j" -> ' + j
                );
            }
        );
    }

    return arr;
}

var fs = buildFunctions();

fs[0](); // first created function
fs[1](); // second created function
fs[2](); // third created function

console.log('\n-----\n\n');

function buildFunctions2() {
    var arr = [];

    for (var i = 0; i < 3; i++) {
        arr.push(
            // immediately execution function to save the value of "i"
            (function(j) {
                console.log('J value now is -> ' + j);
                return function() {
                    console.log('inner "closure" IIFE variable environment reference "j" -> ' + j);
                };
            }(i))
        );
    }

    return arr;
}

var fs2 = buildFunctions2();

fs2[0](); // first created function
fs2[1](); // second created function
fs2[2](); // third created function