import ReactDOM from 'react-dom'
import React from 'react'
import './index.less'
import { rootRouter } from './router'
import * as serviceWorker from './serviceWorker'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

ReactDOM.render(
  <LocaleProvider locale={zhCN}>{rootRouter}</LocaleProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
