import React, { useState } from 'react'
import { Input, Button, Form, Space, message } from 'antd'
import { PHONE_PATTERN } from '@/utils/utils.js'
import { sendSms, bindPhone, checkPhone } from '../services'
import './index.less'

const { Item, useForm } = Form

const PhoneSetting = ({ phone, modal, getInfo }) => {
  let intervalId = null
  const initTime = 60
  const [form] = useForm()
  const [step, setStep] = useState(phone ? 1 : 2)
  const [count, setCount] = useState(initTime)
  const handleSendSms = () => {
    form.validateFields(['phone']).then(async (value) => {
      try {
        if (step === 1) {
          const checkRes = await checkPhone(value)
          if (!checkRes.success) {
            message.warning(checkRes.message)
            return
          }
        }
        const res = await sendSms(value)
        if (res.success) {
          message.success(
            `发送成功，您的验证码为${res.data.code},不过这没什么用，你随便输也能校验通过`
          )
          setCount(initTime - 1)
          intervalId = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount > 1) {
                return prevCount - 1
              }
              clearInterval(intervalId) // 清除 setInterval
              return initTime
            }) // 使用回调函数更新 count
          }, 1000)
        }
      } catch (error) {
        message.warning(error.message)
      }
    })
    // 在按钮点击时禁用按钮立即执行一次
  }
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      if (step === 1) {
        setStep(2)
        intervalId = null
        clearInterval(intervalId) // 清除 setInterval
        setCount(0)
        form.resetFields()
        return
      }
      const res = await bindPhone(values)
      if (res.success) {
        message.success('绑定成功')
        modal.destroy()
        getInfo()
      }
    })
  }
  return (
    <div className='phone-setting-wrap'>
      <p>
        {step === 1 ? '请输入完整的手机号' : '请输入要绑定的手机号'}
        ，并获取验证码
      </p>
      <Form form={form}>
        <Item
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
            {
              pattern: PHONE_PATTERN,
              message: '请输入正确的手机号',
            },
          ]}
          label='手机号'
          name='phone'
        >
          <Input placeholder='请输入' />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          label='验证码'
          name='smsCode'
        >
          <Space>
            <Item noStyle name='smsCode'>
              <Input placeholder='请输入' />
            </Item>
            <Button
              onClick={handleSendSms}
              disabled={count < initTime}
              type='primary'
            >
              {`获取验证码 ${count >= initTime ? '' : `(${count})`}`}
            </Button>
          </Space>
        </Item>
      </Form>
      <Space className='modal-btn-group'>
        <Button onClick={modal.destroy}>取消</Button>
        <Button type='primary' onClick={handleSubmit}>
          {step === 1 ? '下一步' : '完成'}
        </Button>
      </Space>
    </div>
  )
}

export default PhoneSetting
