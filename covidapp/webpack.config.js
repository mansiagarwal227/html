const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  mode : "development",
  devtool: "source-map",
  entry: "./src/index.ts",
  devServer:{ 
    contentBase:path.join(__dirname,'build'),
    port:8080,
    compress:true,
    https:true
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "build"),
   // port:"8080"
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
          title: "Covid Details",
          inject: "body",
        template: "index.html",
          meta:{
              'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
          }
      }),
      new ESLintPlugin({
        extensions:["ts"]
      })
  ]
};