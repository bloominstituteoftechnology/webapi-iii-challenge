module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
    config.module
      .rule('scss')
      .test(/\.scss$/)
      .use('vue-style-loader', 'css-loader', 'sass-loader')
      .loader('vue-style-loader', 'css-loader', 'sass-loader')
      .end()
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()
  }
}

// module.exports = {
//     module: {
//       rules: [
//         // ... other rules omitted
  
//         // this will apply to both plain `.scss` files
//         // AND `<style lang="scss">` blocks in `.vue` files
//         {
//           test: /\.scss$/,
//           use: [
//             'vue-style-loader',
//             'css-loader',
//             'sass-loader'
//           ]
//         },
//         {
//             test: /\.pug$/,
//             loader: 'pug-plain-loader'
//         }
//       ]
//     },
//     // plugin omitted
//   }