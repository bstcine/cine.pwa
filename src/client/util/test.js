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
//
// let query1 = function () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('query1')
//         }, 10000)
//     })
// }
//
// let query2 = function () {
//     return new Promise((resolve, reject) => {
//         resolve('query2')
//     })
// }
//
// let batchQuery = async function () {
//     let q1 = await query1();
//     let q2 = await query2();
//     console.log(q1)
//     console.log(q2)
// }
//
// batchQuery()

// import { normalize, schema } from 'normalizr';
// const course = new schema.Entity('courses');
// const category = new schema.Entity('categorys', {
//     courses: [course],
// });
// const tag = new schema.Entity('tags', {
//     courses: [course],
// });
// const item = new schema.Entity('items', {
//     children: [item],
//     tags: [tag],
// });

// let originalData = [
//     { id: '1', children: [{ id: '1.1', children: [{ id: '1.1.1' }] }, { id: '1.2' }] },
//     { id: '2', children: [{ id: '2.1' }, { id: '2.2' }] },
// ];
// const normalizedData = normalize(originalData, tabList);
// console.log(JSON.stringify(normalizedData));

// let arr = [1, 2, 3, 4, 5, 6];
// const waitFor = ms => new Promise(r => setTimeout(r, ms));

// async function processArray(array) {
//     const promises = array.map(async num => {
//         await process(num);
//     });
//     await Promise.all(promises);
// }
let arr = [1, 2, 3, 4, 5, 6];
function exec() {
    arr.forEach(async num => {
        await process(num);
    });
}
exec();

function process(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num === 4) return reject(new Error('4_error'));
            console.log(num + 'done');
            resolve();
        }, num * 1000);
    });
}
