import _ from 'lodash';


function add(a, b) {
  // eslint-disable-next-line
  console.log(_.join([1, 2, 3], '--'));
  return a + b;
}


add(1, 2);
