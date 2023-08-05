/**
 * @fileName webpack.config.js
 * @description based.config|基础配置
 * @param HtmlWebpackPlugin
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", //开发模式
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    filename: "[name].[hash:8].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
    clean: true, //w4 - clean-webpack-plugin
    publicPath: "/", // 输出解析文件的目录，url 相对于 HTML 页面
  },

  /**
   * @description loaders|模块配置相关资源加载解析配置
   * @param style-loade|
   * @param css-loade|
   * @param less-loade|
   */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"], // 从右向左解析原则
      },
    ],
  },

  /**
   * @description plugin|辅助插件配置
   * @param HtmlWebpackPlugin|根据指定的模板生成HTML文件(含打包后注入的JS)
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
};
