/**
 * @description 自定义webpack loader
 * @param {string}
 */
module.exports = function (content, map, meta) {
  console.log();
  this.callback(null, content, map, meta);
};
