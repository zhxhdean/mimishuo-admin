const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config
  )
  //less
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1DA57A', // 全局主色
    '@link-color': '#1890ff', // 链接色
    '@font-size-base': '14px',// 主字号
    '@text-color': 'rgba(0, 0, 0, .65)'// 主文本色
   },
    javascriptEnabled: true
  })(config, env)

  // decorators
  config = injectBabelPlugin(
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    config
  )
  return config
}
