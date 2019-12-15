// D18_ClosuresAndCallbacks

function sayHiLater() {
    var greeting = 'Hi!';

    // set timeout uses callback function
    setTimeout(function(){
        console.log(greeting);
    }, 3000);
}

sayHiLater();

function telllMeWhenDone(callback) {

    var a = 1000; // some work
    var b = 1000; // some work
    callback();

}

telllMeWhenDone(function(){
    console.log('I am done');
});

telllMeWhenDone(function(){
    console.log('I am done too');
});