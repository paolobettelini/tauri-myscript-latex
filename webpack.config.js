const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory
    filename: 'bundle.js',  // Output file name
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [ "src" ],
    })
  ],
  mode: "production"
};
