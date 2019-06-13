module.exports = function loader(source) {
  return `${source} let a=888;console.log(a)`;
};
