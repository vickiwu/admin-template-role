'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
// const GlobalConfig = require('./src/globalConfig.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '有害生物数据库' // 页面标题

// 启动端口 9528
const port = 9528

module.exports = {

  publicPath: '/zacao',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: {
    //   '/test': {
    //     target: `http://${GlobalConfig.serverIP}:${GlobalConfig.serverPort}`,
    //     changeOrigin: true,
    //     xfwd: true,
    //     pathRewrite: {
    //       '^/test': ''
    //     }
    //   }
    // }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')

    // set svg-sprite-loader 图标处理
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              minSize: 2,
              cacheGroups: {
                libs: {
                  name: 'ss-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial'
                },
                elementUI: {
                  name: 'chunk-elementUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                weedConfig: {
                  name: 'weedGlobalConfig',
                  priority: 20,
                  test: resolve('src/globalConfig.js')
                },
                cityJson: {
                  name: 'chunk-cityJson',
                  priority: 20,
                  test: resolve('src/assets/json/cities.json')
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
