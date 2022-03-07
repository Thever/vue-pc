module.exports = {
  //关闭eslint
  lintOnSave: false,
  //打包时不产生map映射文件
  productionSourceMap: false,
  //配置代理
  devServer: {
    proxy: {
      //  目标路径
      '/api': {
        //  要获取数据的服务器地址
        target: 'http://39.98.123.211/',
        //  路径重写
        // pathRewrite: { '^/api': '' },
      },
    },
  },
};
