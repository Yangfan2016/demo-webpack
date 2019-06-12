import _ from 'lodash';

export function add(a, b) {
  // eslint-disable-next-line no-console
  console.log(_.join([a, b], '-'));
  return a + b;
}
export function minus(a, b) {
  return a - b;
}
const yf = {
  name: 'lib',
  add,
  minus,
  a: 1,
  1: 2,
};
export default yf;
