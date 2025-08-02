const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = isDev => isDev ? {
  devServer: {
    port: 8080,
    open: true,
    hot: true,
  }
} : {};

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles/main.css'
    }),
  ],
  module: {
    rules: [
      // изображения
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]'
        }
      },
      // шрифты
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash][ext]'
        }
      },
      // html-файлы
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      // обычный CSS
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }
          },
          'css-loader'
        ]
      },
      // SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  ...devServer(develop)
});