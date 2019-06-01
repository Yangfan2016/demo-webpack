import { add } from './utils/esnext';
import './utils/com';
const { minus } = require('./utils/common');

let res = add(1, 2);

console.log(res);


res = minus(1, 2);

console.log(res);

// require(['./utils/amd'], (m) => {
//     let { mulitple } = m;
//     res = mulitple(1, 2);
//     console.log(res);
// });


let arr = [1, 2, 3];
let brr = [...arr, 4, 5, 6];

console.log(brr);

new Promise((r, j) => {
    r(1);
});

brr.includes(11);



class Shape {

}

new Shape;

// import _ from 'lodash';

// res = _.join(['a', 'b', 'c'], '***');

// console.log(res);

// import('lodash').then(({default:_})=>{
//     res=_.join(['a','b','c'],'***');

//     console.log(res);
// });


import $ from 'jquery';

$('body').css('background-color', '#080');

document.addEventListener('click', function () {
    import(/* webpackPrefetch: true */ 'lodash').then(function ({default:_}) {
        console.log(_.join(['3', '4']))
    })
});
