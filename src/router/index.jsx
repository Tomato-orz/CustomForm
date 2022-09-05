
import App from '@/pages/App/App.jsx'
import { Login } from '@/pages/Login'
import { Drag } from '@/pages/Drag'
import { useRoutes, useLocation, useNavigate, useOutlet, Navigate } from 'react-router-dom'
import { useEffect, useState, } from 'react'
export const Router = () => {
  //static routes
  const staticroutes = [
    {
      path: "/",
      element: <Auth />,
      children: [
        { path: "drag", element: <Drag /> },
        { path: "/", element: <App /> },
      ]
    },
    { path: "login", element: <Login /> },
    { path: '/403', element: <div>403</div> },
    {
      path: '*',
      element: <div>404</div>
    }
  ]


  return (
    useRoutes(staticroutes)
  )
}
const Auth = () => {
  const oultet = useOutlet()
  const navigate=useNavigate()
  const [menu, setmenu] = useState('')
  const { pathname } = useLocation()
  const token = localStorage.getItem('token')
  let dom=''
  if (token) {
    if (menu) {
      if (!menu.includes(pathname)) {
        return <Navigate to="/403" replace />;
      }
      else{
        dom=oultet
      }
    } else {
      setTimeout(() => {
        setmenu(['/','/drag'])
      })
    }
  } 
  else {
    dom= <Navigate to="/login" replace state={{from:pathname}} />;
  }
  return dom
}