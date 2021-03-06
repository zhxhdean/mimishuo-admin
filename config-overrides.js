const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config
  )
  //less
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1890ff', // 全局主色
    '@link-color': '#1890ff', // 链接色
    '@font-size-base': '14px',// 主字号
    '@text-color': 'rgba(0, 0, 0, .65)'// 主文本色
   },
    javascriptEnabled: true
  })(config, env)

  // decorators(配置)
  // config = injectBabelPlugin(
  //   ['@babel/plugin-proposal-decorators', { legacy: true}],
  //   config
  // )
  config.devtool = 'cheap-module-source-map' // 用于build
  injectBabelPlugin('transform-decorators-legacy', config);
  console.log(config)
  return config
}
