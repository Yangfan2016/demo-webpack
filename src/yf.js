import _ from 'lodash';

export function add(a, b) {
    console.log(_.join([a, b], '-'));
    return a + b;
}
export function minus(a, b) {
    return a - b;
}
var yf = {
    name: "lib",
    add: add,
    minus: minus,
    a: 1,
    1: 2
};
export default yf;
