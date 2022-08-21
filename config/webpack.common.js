const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const paths = require('./paths')
const pages = [  
  "ui_common","news_list","sites","contact",
  "form_test","related","news_view","publication",
  "product_flow","product_esg","product_general","product_general_content",
  "index","home",
  //"concept",
  //"draft_a_1","draft_b_1",'draft_c_1','draft_d_1',
  //'guide_color','guide_typo','guide_layout','guide_spacing',
  //'component_1','sample_landing_1','cards_1',
  //'carousel_1','scroll_action_01'
]

module.exports = {
  entry: pages.reduce((config, page) =>{
    config[page] = paths.src + `/${page}.js`;
    return config
  },{}),
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: '',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ].concat(pages.map(
    (page) => new HtmlWebpackPlugin({
      favicon: paths.src + '/img/favicon.png',
      template: paths.src + `/${page}.html`,
      filename: `${page}.html`,
      chunks: [page],
      inject: 'body'
    })
  )
  ),

  module: {
    rules: [
      //{ test: /\.js$/, use: ['babel-loader'] },
      {
        test : /\.js$/,
        exclude: /node_modules/,
        use : "babel-loader"
    },
      { test: /\.(?:ico|gif|png|jpg|jpeg|glb|gltf|hdr|)$/i, type: 'asset/resource',
      generator:{
        filename: './img/[hash].[ext]' 
      }
    },
      { test: /\.(?:mp3|mp4|webm|ogg)$/i, type: 'asset/videos' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      //{ test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      //{ test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ }
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
