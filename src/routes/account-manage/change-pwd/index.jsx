import React from 'react'
import { Form, Input, Space, Button, message } from 'antd'
import { PASSWORD_PATTERN, NO_SPACER_PATTERN } from '@/utils/utils'
import { checkPwd, changePwd } from '../services'

const { Item, useForm } = Form
const { Password } = Input

const ChangePwd = ({ modal }) => {
  const [form] = useForm()

  const handleChangePwd = async (password) => {
    try {
      const res = await changePwd({ password })
      if (res.success) {
        message.success('修改成功')
        modal.destroy()
      }
    } catch (error) {
      message.warning(error.message)
    }
  }

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        const { oldPassword, password } = values
        const res = await checkPwd({ oldPassword })
        if (res.success) {
          handleChangePwd(password)
          return
        }
        message.warning(res.message)
      } catch (error) {
        message.warning(error.message)
      }
    })
  }
  return (
    <div className='change-pwd-wrap'>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
        <Item
          rules={[
            {
              required: true,
              message: '请输入原密码',
            },
          ]}
          label='原密码'
          name='oldPassword'
        >
          <Password placeholder='请输入' />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
            {
              pattern: PASSWORD_PATTERN,
              message: '密码必须包含数字和字母,8-16位',
            },
            {
              pattern: NO_SPACER_PATTERN,
              message: '不能输入空格',
            },
          ]}
          label='新密码'
          name='password'
        >
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
          name='rePassword'
        >
          <Password placeholder='请输入' />
        </Item>
      </Form>
      <Space className='modal-btn-group'>
        <Button onClick={modal.destroy}>取消</Button>
        <Button type='primary' onClick={handleSubmit}>
          完成
        </Button>
      </Space>
    </div>
  )
}

export default ChangePwd
