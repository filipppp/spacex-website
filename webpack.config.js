const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');


module.exports = (env, options) => {
  const devMode = options.mode === 'development';
  return {
    devtool: devMode ? 'inline-source-map' : 'none',
    entry: [
      './src/js/app.ts',
      './src/scss/main.scss',
    ],
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/app.[hash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              exclude: /node_modules/,
              loader: 'file-loader?limit=1024&name=fonts/[name].[ext]'
          },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/',
              },
            },
            devMode ? 'css-loader' : { loader: 'css-loader', options: { minimize: true } },
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: devMode ? [{loader: 'html-loader', options: {attrs: ['img:src', 'source:srcset']}}] : [{ loader: 'html-loader', options: { minimize: true } }],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash].[ext]',
                context: '',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new CopyPlugin([
            {from: "img/vid.mp4", to: "img/vid.mp4", context: "src"}
        ]),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebPackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
      }),
    ],
  };
};

