import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import crypto from '@/utils/crypto'
import { userLogin } from '../services'
import { t } from '@/utils/i18n'

const { Item, useForm } = Form
const { Password } = Input

const Login = () => {
  const [form] = useForm()
  const navigate = useNavigate()
  const { setLoading } = useOutletContext()

  const handleLogin = () => {
    form.validateFields().then(async (values) => {
      setLoading(true)
      try {
        const res = await userLogin(values)
        setLoading(false)
        if (res.success) {
          const userId = crypto.encrypt(res.data)
          localStorage.setItem('userId', userId)
          message.success('登录成功')
          navigate('/')
          return
        }
        message.warning(res.message)
      } catch (error) {
        setLoading(false)
      }
    })
  }

  return (
    <>
      <div className='h1-title'>登录</div>
      <Form
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 21,
        }}
        labelAlign='left'
        form={form}
      >
        <Item
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
          label='用户名'
          name='username'
        >
          <Input placeholder='请输入' />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          label='密码'
          name='password'
        >
          <Password placeholder='请输入' />
        </Item>
      </Form>
      <Button className='submit-btn' onClick={handleLogin} type='primary'>
        {t('登录')}
      </Button>
      <div className='user-page-change'>
        还没账号？去
        <Link to='/user/register'>注册</Link>
      </div>
    </>
  )
}

export default Login
