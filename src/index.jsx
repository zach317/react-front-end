import React from 'react'
import ReactDOM from 'react-dom/client'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import App from './app'
import './index.less'

dayjs.locale('zh-cn')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)
