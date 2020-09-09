module.exports = {
    publicPath:'./',
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    configureWebpack:{
      resolve: {
          alias: {
            'assets': '@/assets',
            'components': '@/components',
            'views': '@/views'
          }
        }
    }
  }
  