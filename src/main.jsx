import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from '@/router'
import { BrowserRouter } from 'react-router-dom'
import 'moment/dist/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)
