const path = require('path');
module.exports = {
    entry: './ts/index.ts',
    devtool: 'inline-source-map',
    module:{
        rules:[{
            test:/\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve:
    {
      extensions: ['.ts','.js']
    },
    devServer: {
        host:"localhost",
        port: 8080,
          compress: true,
          https:true
      },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')    
    }
}
