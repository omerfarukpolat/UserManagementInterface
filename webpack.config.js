import path from 'path';

// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
  entry: './src/index.tsx',
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, 'src/components'),
      // eslint-disable-next-line no-undef
      '@pages': path.resolve(__dirname, 'src/pages'),
      // eslint-disable-next-line no-undef
      '@services': path.resolve(__dirname, 'src/services'),
      // eslint-disable-next-line no-undef
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    // eslint-disable-next-line no-undef
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    historyApiFallback: true, // Enable client-side routing
    hot: true, // Enable Hot Module Replacement (HMR)
  },
};
