const sass = require('node-sass');

/* Preprocesses scss from *.riot files */
module.exports = function riotScssPreprocessor(code, { options }) {
    const { file } = options;
    console.log('Compile the sass code in', file);
    const { css } = sass.renderSync({
      data: code
    });

    return {
      code: css.toString(),
      map: null
    }
  }
