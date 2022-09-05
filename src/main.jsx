import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from '@/router'
import { BrowserRouter,HashRouter } from 'react-router-dom'
import 'moment/dist/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter >
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    </HashRouter>
  </React.StrictMode>
)
