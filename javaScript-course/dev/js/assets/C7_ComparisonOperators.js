// C7_ComparisonOperators
console.log(1 < 2 < 3); // true
console.log(3 < 2 < 1); // true because of associativity and coercion 3 < 2 = false (ltr for '<'), thus false (0) < 1 = true
Number(undefined); // NAN Not A Number
Number(null); // 0

// equality
null == 0; // true
null < 1; // true
"" == 0; // true

console.log(
    'null == 0 -> ' + (null == 0) + '\n' + 
    'null < 1 -> ' + (null < 1) + '\n' + 
    '\"\" == 0 -> ' + ("" == 0)
);

console.log(
    'null === 0 -> ' + (null === 0) + '\n' + 
    '\"\" === 0 -> ' + ("" === 0)
);