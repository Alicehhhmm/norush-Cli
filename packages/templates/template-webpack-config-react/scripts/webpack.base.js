/**
 * @fileName webpack.config.js
 * @description based.config|基础配置
 * @param HtmlWebpackPlugin
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = isDev => ({
  mode: isDev ? "development" : "production",
  entry: path.resolve(__dirname, "../src/main.jsx"),
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true, //w4 - clean-webpack-plugin
    publicPath: "/", // 输出解析文件的目录，url 相对于 HTML 页面
  },

  /**
   * @description 入口文件限制
   * @param assetFilter |只给出 js 文件的性能提示
   * @official https://webpack.docschina.org/configuration/performance/#performance
   */
  performance: {
    hints: "warning",
    maxEntrypointSize: 40000000,
    maxAssetSize: 20000000,

    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    },
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
        test: /.(js|jsx)$/,
        exclude: /node_modules/, //排除内容不解析
        use: {
          loader: "babel-loader",
        },
      },
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
      {
        test: /.(png|jpg|jepg|git|svg)$/,
        type: "asset", //如果图片大于限制则使用 asset/resource 处理，如果图片小于限制 asset/inline 处理
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/images/[name][ext]",
        },
      },
      {
        test: /.(woff2|eot|ttf|otf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/fonts/[name][ext]",
        },
      },
      {
        test: /.(mp4|mp3|webm)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/medias/[name][ext]",
        },
      },
    ],
  },

  /**
   * @description resolve|解析配置
   * @param {String} extensions |文件后缀扩展
   * @param {object} alias |别名配置
   */
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
    alias: {
      "@": path.join(__dirname, "../src"),
    },
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
});
