/**
 * @fileName webpack.config.js
 * @description based.config|基础配置
 * @param HtmlWebpackPlugin
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true, //w4 - clean-webpack-plugin
    publicPath: "./", // 输出解析文件的目录，url 相对于 HTML 页面
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
        // use: ["style-loader", "css-loader", "postcss-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        // use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        // use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
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
    // new MiniCssExtractPlugin(),
    new MiniCssExtractPlugin({
      // [content hash] - chunk hash - hash : 内容变了，我才有消除缓存的意义和价值。
      filename: "static/css/[name].[contenthash:8].css",
    }),
  ],
};
