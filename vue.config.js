module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        //  接口请求路径
        target: `https://tian.mdjkj.top/`,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 37.5, //换算基数，1rem相当于10px,值为37.5时,1rem为20px,淘宝的flex默认为1rem为10px
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3
          })
        ]
      }
    }
  },
  publicPath: "/",
  outputDir: "dist", // 输出文件目录
  assetsDir: "./wxh5", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: "./index.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  lintOnSave: true,
  transpileDependencies: [],
  productionSourceMap: false
};
