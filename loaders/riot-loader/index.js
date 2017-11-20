/* loader written for loading riot csp library and compiling tag files */
const riot = require('riot');

const TAGS_NAMES_REGEX = /riot.tag2\(['|"](.+?)['|"],/g;

module.exports = function (source) {
  const compiledTags = riot.compile(source, {}, this.resourcePath);
  const tags = [];

  compiledTags.replace(TAGS_NAMES_REGEX, (_, match) => {
    tags.push(match);
  });

  return `
    var riot = require('riot/riot.csp.js')
    ${compiledTags}
  `;
};
