class CopyrightWebpackPlugin {
  constructor(info) {
    this.info = info;
  }

  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    const { info } = this;
    // 同步钩子
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', () => {
      // eslint-disable-next-line no-console
      console.log('\n=== compile sync start ===');
    });

    // 异步钩子
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',
      (compilation, cb) => {
        // eslint-disable-next-line no-console
        console.log('\n=== compile async start ===');
        // 生成一个 copyright.txt 文件
        const c = compilation;
        c.assets['copyright.txt'] = {
          source() {
            return info || '';
          },
          size() {
            return info.length; // 上面 source 返回的字符长度
          },
        };
        cb();
      });

    compiler.hooks.afterEmit.tapAsync('CopyrightWebpackPlugin',
      (compilation, cb) => {
        // eslint-disable-next-line no-console
        console.log('\n=== compile done ===');

        cb();
      });
  }
}

module.exports = CopyrightWebpackPlugin;
