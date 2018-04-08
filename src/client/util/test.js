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
            resolve('query1')
        }, 10000)
    })
}

let query2 = function () {
    return new Promise((resolve, reject) => {
        resolve('query2')
    })
}

let batchQuery = async function () {
    let q1 = await query1();
    let q2 = await query2();
    console.log(q1)
    console.log(q2)
}

batchQuery()

