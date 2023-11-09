import React from 'react'
import ReactDOM from 'react-dom/client'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import './index.less'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import App from './app'

dayjs.locale('zh-cn')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <DndProvider backend={HTML5Backend}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </DndProvider>
)
