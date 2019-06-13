module.exports = function loader(source) {
  // eslint-disable-next-line no-console
  console.log(this.query);
  const result = source.replace(/\bworld\b/g, 777);
  this.callback(null, result);
  // return result;
};
