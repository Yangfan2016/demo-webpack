import * as _ from 'lodash';

interface iYf {
    name: string;
    add: (a: number, b: number) => number;
    minus: (a: number, b: number) => number;
    [property: string]: any;
    [property: number]: any;
}

export function add(a: number, b: number): number {
    console.log(_.join([a, b], '-'));
    return a + b;
}
export function minus(a: number, b: number): number {
    return a - b;
}

let yf: iYf = {
    name: "lib",
    add,
    minus,
    a: 1,
    1: 2,
};
export default yf; 