module.exports = function loader(source) {
  // eslint-disable-next-line no-console
  console.log(this.query);
  const callback = this.async();

  setTimeout(() => {
    const result = source.replace(/\bhello\b/, '666');
    callback(null, result);
  }, 0);
};
