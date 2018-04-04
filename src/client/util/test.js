// 'use strict';
// fn(2)
// var fn = function (a) {
//     console.log(a)
// };
//
// fn(2)
//
// var a = function (aaa) {
//
// };

// let index = 0;

let query1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('query1', new Date().getTime())
            resolve()
        }, 1000)
    })
}

let query2 = function () {
    return new Promise((resolve, reject) => {
        console.log('query2', new Date().getTime())
        resolve()
    })
}

let batchQuery = async function () {
    await query1();
    await query2();
}

batchQuery()

