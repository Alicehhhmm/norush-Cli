/**
 * @fileName webpack.config.js
 * @description based.config|基础配置
 * @param HTMLWebpackPlugin
 */
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = isDev => ({
  mode: isDev ? "development" : "production",
  entry: path.join(__dirname, "../src/main.jsx"),
  output: {
    filename: "static/js/[name].[chunkhash:8].js",
    path: path.join(__dirname, "../dist"),
    clean: true, //w4 - clean-webpack-plugin
    publicPath: "/",
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
      /**
       * @description JS/TS Loade
       */
      {
        test: /.(js|jsx)$/,
        include: path.resolve(__dirname, "../src"),
        use: {
          loader: "babel-loader",
        },
        exclude: "/node_modules",
      },

      /**
       * @description Css Loade
       */
      {
        oneOf: [
          {
            // 定义一下，使用 xxx.module.（less|css)
            test: /.module.(less|css)$/,
            include: [path.resolve(__dirname, "../src")],
            use: [
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  // 开启 css modules
                  modules: {
                    localIdentName: "[path][name]__[local]--[hash:base64:4]",
                  },
                },
              },
              "postcss-loader",
              "less-loader",
            ],
          },
          {
            test: /.(less)$/,
            use: [
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "less-loader",
            ],
          },
          {
            test: /.(css)$/,
            use: [
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          },
        ],
      },

      /**
       * @description assetss|静态资源配置
       * @param 图片、字体
       * @param 视频、音频
       */
      {
        test: /.(png|jpg|jepg|git|svg)$/,
        include: path.resolve(__dirname, "../src/assets"),
        type: "asset", //如果图片大于限制则使用 asset/resource 处理，如果图片小于限制 asset/inline 处理
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/images/[name][ext]",
        },
        exclude: "/node_modules",
      },
      {
        test: /.(woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, "../src/assets"),
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/fonts/[name][ext]",
        },
        exclude: "/node_modules",
      },
      {
        test: /.(mp4|mp3|webm)$/,
        include: path.resolve(__dirname, "../src/assets"),
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/medias/[name][ext]",
        },
        exclude: "/node_modules",
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
   * @param HTMLWebpackPlugin|根据指定的模板生成HTML文件(含打包后注入的JS)
   */
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
      minify: {
        minifyCSS: false, // 是否压缩css
        collapseWhitespace: false, // 是否折叠空格
        removeComments: true, // 是否移除注释
      },
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
  ],
});
