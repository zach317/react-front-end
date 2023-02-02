import React from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd'
import dayjs from 'dayjs'
import { userRegister } from '../services'
import './index.less'

const { Item, useForm } = Form
const { Password } = Input
const options = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
]
const Register = () => {
  const [form] = useForm()

  const handleRegister = () => {
    form.validateFields().then(async (values) => {
      const { birth } = values
      const time = dayjs(birth).format('YYYY-MM-DD')
      try {
        const res = await userRegister({ ...values, birth: time })
        console.log('🚀  form.validateFields  res', res)
      } catch (error) {}
    })
  }
  return (
    <div className='register-wrap'>
      <div className='h1-title'>注册</div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        form={form}>
        <Item
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
            {
              pattern: /^[a-zA-Z][a-zA-Z0-9_-]{3,15}$/,
              message: '用户名仅支持字母、数字、_和—且必须以字母开头,4-16位',
            },
          ]}
          label='用户名'
          name='userName'>
          <Input placeholder='请输入' />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              pattern: /(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d]){8,16}/,
              message: '密码必须包含数字和字母,8-16位',
            },
            {
              pattern: /^(?!.*[\s])/,
              message: '不允许使用空格',
            },
          ]}
          label='密码'
          name='password'>
          <Password placeholder='请输入' />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请输入确认密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码输入不一致'))
              },
            }),
          ]}
          label='确认密码'
          dependencies={['password']}
          name='rePassword'>
          <Password placeholder='请输入' />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请选择性别',
            },
          ]}
          label='性别'
          name='gander'>
          <Select placeholder='请选择' options={options} />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请选择出生年月',
            },
          ]}
          label='出生年月'
          name='birth'>
          <DatePicker placeholder='请选择' style={{ width: '100%' }} />
        </Item>
      </Form>
      <Button onClick={handleRegister} type='primary'>
        注册
      </Button>
      <div></div>
    </div>
  )
}

export default Register
