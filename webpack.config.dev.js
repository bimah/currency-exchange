const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const Sass = require('sass');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.tsx'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: './dist',
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'images'),
          to: 'images'
        }
      ]
    }),
    new ESLintPlugin({
      extensions: ['js', 'tsx']
    }),
    new HtmlWebpackPlugin({
      title: 'Currency Exchange',
      template: 'index.html'
    }),
    new StyleLintPlugin({
      configFile: './.stylelintrc.json',
      files: '**/*.s?(a|c)ss',
      failOnError: false,
    })
  ],
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]-[name]__[local]--[hash:base64:5]'
              },
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'images'),
        use: [
          {
            loader: 'svg-url-loader'
          },
        ]
      }
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
