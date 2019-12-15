// D20b_FunctionalProgrammingPart2
var arr1 = [1, 2, 3];

// using underscore library array map
var arr2 = _.map(arr1, function(item) {
    return  item * 3;
});

console.log('arr2 -> ' + arr2);

// using underscore library filter
var arr3 = _.filter([2, 3, 4, 5, 6, 7], function(item) {
    return  item % 2 === 0; // will return only items divisible by two
});

console.log('arr3 -> ' + arr3);

