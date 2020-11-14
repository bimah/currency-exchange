const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Sass = require('sass');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss']
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.tsx?$/],
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
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]-[name]__[local]--[hash:base64:5]'
              },
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer']
                ]
              }
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'images'),
          to: 'images'
        }
      ]
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Currency Exchange',
      template: 'index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
