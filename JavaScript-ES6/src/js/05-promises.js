console.log(
    '=========================================',
    '\n  Promises',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Creating and Resolving promises',
    '\n-----------------------------------------'
);

let promise = new Promise(function(resolve, reject){
    // simulating asynchronous task
    setTimeout(function(){
        resolve('Done!'); // resolve parameter is a function
        console.log('...done');
    }, 300);
    
});

// executing task when promise is resolved
promise.then(function(value){
    console.log(value); // -> Done!
}, function(err){
    console.log(err);
});

let failPromise = new Promise(function(resolve, reject){
    // simulating asynchronous task
    setTimeout(function(){
        reject('Failed!'); // reject parameter is a function
        console.log('...fail');
    }, 600);
});

// executing task when promise is rejected
failPromise
    .then(function(value){
        console.log(value); 
    }, function(err){
        console.log(err); // -> Failed!
    });


console.log(
    '-----------------------------------------',
    '\n  Chaining promises, and catching errors',
    '\n-----------------------------------------'
);

function waitASecond(seconds) {
    return new Promise(function(resolve, reject){
        if(seconds >= 3) {  // reject promise condition
            reject('rejected!!');
        } else {
            setTimeout(function(){
                console.log('seconds...' + seconds);
                seconds++;
                resolve(seconds);
            }, 1000);
        }
    });
}

waitASecond(0)                  // initialize function with (0) seconds 
    .then(waitASecond)          // will take resolve 'seconds' (1) as an argument
    .then(waitASecond)          // will take resolve 'seconds' (2) as an argument
    .then(waitASecond)          // will take resolve 'seconds' (3) as an argument, fails
    .then(function(seconds) {   // finish promise chaining
        console.log('finished, seconds...' + seconds); // never reached because of failing condition
    })
    .catch(function(err){        // catching error, will always be trigger when promise/promise chain fails
        console.log(err);
    });


console.log(
    '-----------------------------------------',
    '\n  Built in methods, "All" and "Race"',
    '\n-----------------------------------------'
);

let promiseA = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('promiseA resolved!');
    }, 4000);
});

let promiseB = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('promiseB resolved!');
    }, 4500);
});

Promise.all([promiseA, promiseB])   // combines all promises and wait for all of them to be resolved
    .then(function(success){
        console.log(success);       // -> (2) ["promiseA resolved!", "promiseB resolved!"]
    })
    .catch(function(err){
        console.log(err);
    });
    
    
let promiseC = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('promiseB resolved!');
    }, 5000);
});

let promiseD = new Promise(function(resolve, reject){
    setTimeout(function(){
        reject('promiseD rejected!');
    }, 5500);
});

Promise.all([promiseC, promiseD])   // combines all promises and wait for all of them to be resolved
    .then(function(success){
        console.log(success);       
    })
    .catch(function(err){
        console.log(err);           // -> promiseD rejected!, fails
    });


let promiseE = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('promiseE resolved!');
    }, 6000);
});

let promiseF = new Promise(function(resolve, reject){
    setTimeout(function(){
        reject('promiseF rejected!');
    }, 6500);
});

Promise.race([promiseE, promiseF])   // combines all promises and wait for the first of them, to be resolved
    .then(function(success){
        console.log(success);       // -> promiseE resolved!, resolved
    })
    .catch(function(err){
        console.log(err);
    });