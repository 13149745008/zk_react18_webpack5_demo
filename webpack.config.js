const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  // 使用source-map追踪错误代码
  devtool: "inline-source-map",

  // 配置开发环境
  mode: "development",

  // 入口
  entry: {
    app: "./src/main.tsx",
  },

  // 出口
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },

  // webpack自带热启动服务器 HMR
  devServer: {
    // 重定向回index.html而不是报错
    historyApiFallback: true,
    // 默认打开页面
    static: path.join(__dirname, "./dist"),
    // 压缩代码
    compress: true,
    open: false,
    hot: true,
    port: 8888,
    // 启动serve时仍保存dist下的文件（默认清空，写入内存中）
    devMiddleware: {
      writeToDisk: true,
    },
  },

  // 插件
  plugins: [
    // 配置html模板
    new HtmlWebpackPlugin({
      title: "zk_demo",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),

    // 在打包之前清除dist
    new CleanWebpackPlugin(),

    // 命令行友好工具
    new friendlyErrorsWebpackPlugin(),
  ],

  // 配置loader，解析模块
  module: {
    rules: [
      // JavaScript
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },

      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },

      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },

      // ts文件
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
