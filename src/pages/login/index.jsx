import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Input, Form } from 'antd'
import css from './index.module.less'
export const Login = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const login = () => {
    const time = setTimeout(() => {
      localStorage.setItem('token', 'token')
      navigate(state?.from || '/')
      clearTimeout(time)
    })
  }
  const onFinish = () => {

  }
  const onFinishFailed = () => {

  }
  return (
    <div className={css.login}>
      <div className={css['login-box']}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账户"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' onClick={login}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>

    </div>
  )
}