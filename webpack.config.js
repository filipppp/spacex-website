const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = (env, options) => {
  const devMode = options.mode === 'development';
  return {
    devtool: devMode ? 'inline-source-map' : 'none',
    entry: [
      './src/js/app.ts',
      './src/scss/main.scss',
    ],
    output: {
      filename: './js/app.[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            devMode ? 'css-loader' : { loader: 'css-loader', options: { minimize: true } },
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: devMode ? ['html-loader'] : [{ loader: 'html-loader', options: { minimize: true } }],
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

