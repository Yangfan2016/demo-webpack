// import { add } from './utils/esnext';
// import './utils/com';
// const { minus } = require('./utils/common');

// let res = add(1, 2);

// console.log(res);


// res = minus(1, 2);

// console.log(res);

// // require(['./utils/amd'], (m) => {
// //     let { mulitple } = m;
// //     res = mulitple(1, 2);
// //     console.log(res);
// // });


// let arr = [1, 2, 3];
// let brr = [...arr, 4, 5, 6];

// console.log(brr);

// new Promise((r, j) => {
//     r(1);
// });

// brr.includes(11);



// class Shape {

// }

// new Shape;

// // import _ from 'lodash';

// // res = _.join(['a', 'b', 'c'], '***');

// // console.log(res);

// // import('lodash').then(({default:_})=>{
// //     res=_.join(['a','b','c'],'***');

// //     console.log(res);
// // });


// // import $ from 'jquery';

// // $('body').css('background-color', '#080');

// document.addEventListener('click', function () {
//     import('./css/base');
//     import(/* webpackPrefetch: true */ 'lodash').then(function ({ default: _ }) {
//         console.log(_.join(['3', '4']));
//     });
// });



// import { join } from 'lodash-es';

// console.log(join(['a', 'b', 'c'], '-'));

// import _ from 'lodash';

// console.log(_.join(['a', 'b', 'c'], '-'));

// import './css';
// import img from './assets/images/2.png';

// let box = document.createElement('div');
// box.className = 'js-box';
// box.style.cssText = `;background-image:url(${img});`;


// document.body.appendChild(box);


// import $ from 'jquery';

import './css/base';
import './assets/fonts/iconfont.css';
import Vue from 'vue';
import _ from 'lodash';

$('body').css('background-color', '#123');

console.log(jQuery === $);



let res = _.join(['123', 'b78', '678'], '***');

console.log(res);



new Vue;


import './change';

// if (module.hot) {
//     module.hot.accept('./change.js', function () {
//         console.log('==========  [CHANGED]  index.js    =======');
//     });
//     module.hot.accept('./css/base.css', function () {
//         console.log('==========  [CHANGED]  base.css    =======');
//     });
// }