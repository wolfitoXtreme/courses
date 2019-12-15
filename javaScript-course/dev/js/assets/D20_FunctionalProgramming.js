// D20_FunctionalProgramming

var arr1 = [1, 2, 3];
console.log('arr1 -> ' + arr1);

var arr2 = [];
for(var i=0; i < arr1.length; i++) {
    arr2.push(arr1[i] * 2);
}

console.log('arr2 -> ' + arr2);

// same as above, using functional programming
function mapForEach(arr, fn) {
    var newArr = [];
    for(var i = 0; i < arr.length; i++) {
        newArr.push(
            fn(arr[i])
        );
    }

    return newArr;
}

var arr3 = mapForEach(arr1, function(item){
    return item * 2;
});

console.log('arr3 -> ' + arr3);

// reusing same function to perform a different task
var arr4 = mapForEach(arr1, function(item){
    return item > 2;
});

console.log('arr4 -> ' + arr4);

// same as above using variables and binding a function
var checkPassLimit = function(limiter, item) {
    return item > limiter;
}

var arr5 = mapForEach(arr1, checkPassLimit.bind(this, 1));
console.log('arr5 -> ' + arr5);

// same as above but wi
var checkPassLimitSimplified = function(limiter) {
    return function(limiter, item) {
        return item > limiter
    }.bind(this, limiter);
}

var arr6 = mapForEach(arr1, checkPassLimitSimplified(1));
console.log('arr6 -> ' + arr6);
