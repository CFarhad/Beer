const path = require("path");

const TerserWebpackPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  entry: {
      beer: "./src/index.js",
      "beer.min": "./src/index.js",
  },
  output: {
      path: path.resolve(__dirname, "bundle"),
      filename: "[name].js",
      library: "Beer",
      libraryExport: "default",
  },

  plugins: [
      new TerserWebpackPlugin({
          test: /\.min\.js$/,
          terserOptions: {
              format: {
                  comments: false,
              },
          },
          extractComments: false,
      }),
  ],
  stats: "errors-only",
  devServer: {
      static: {
          directory: path.resolve(__dirname, "demo"),
          watch: true,
      },
      watchFiles: ["src/**/*.js"],
      magicHtml: true,
      compress: true,
      port: 9000,
  },
};