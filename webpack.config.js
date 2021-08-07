const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  mode : "development",
  devtool: "source-map",
  entry: "./src/index.ts",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "build")
  },

  module:{
    rules:[
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use:[
            'style-loader',
            'css-loader'
        ]
      }
    ]
  },
  resolve:{
    extensions: ['.ts','.js','.css']
  },
  plugins:[
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
          title: "COVIDAPP",
          inject: "body",
        template: "index.html",
          meta:{
              'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
          }
      }),
      new ESLintPlugin({
        extensions:["ts"]
      })
  ], devServer: {
    open:true,
    disableHostCheck:true,
    port: 8080,
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
};