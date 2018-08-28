module.exports = {

    //部署应用时的基本 URL
    baseUrl: process.env.NODE_ENV === 'production' ? '/' : './',

    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

    outputDir: 'dist',
    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: false,
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项
    // devServer: {
    //     port: 8080, // 端口号
    //     host: 'localhost',
    //     https: false, // https:{type:Boolean}
    //     open: true, //配置自动启动浏览器
    //     proxy: 'http://market.nilaiya.com/api/app/fast2' // 配置跨域处理,只有一个代理
    // }
    devServer: {
        proxy: 'http://market.nilaiya.com/api/app/fast2', //配置代理地址
        // open: true, //配置自动启动浏览器
    },
    // assetsSubDirectory: 'static',//必须
}