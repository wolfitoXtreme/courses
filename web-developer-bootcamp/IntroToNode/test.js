function echo(string, times) {
    for(var i=0; i<times; i++) {
        console.log(string + '[' + i + ']');
    }
}

echo('myTest', 5);

var scores = [90, 98, 89, 100, 100, 86, 94],
    scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];


function average(scores) {
    var count = 0,
        result;

    scores.forEach(function(score) {
        count += score;
    });

    // for(var i=0; i<amount; i++) {
    //     count += array[i];
    //     console.log(array[i]);
    // }

    result = Math.round(count / scores.length);

    return 'average is => ' +  result;
}

console.log(average(scores));
console.log(average(scores2));